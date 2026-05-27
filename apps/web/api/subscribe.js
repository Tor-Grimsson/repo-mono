// Newsletter signup → Kit (kit.com) v4 API.
// Creates a subscriber on the account list. Broadcasts are sent from the Kit dashboard.
// Env: KIT_API_KEY (Settings → Developer), KIT_FORM_ID (optional, for form attribution).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const apiKey = process.env.KIT_API_KEY
  if (!apiKey) {
    console.error('subscribe: KIT_API_KEY not set')
    return res.status(500).json({ error: 'Server not configured' })
  }

  try {
    const response = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': apiKey,
      },
      body: JSON.stringify({ email_address: email }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('subscribe: Kit API error', response.status, detail)
      return res.status(502).json({ error: 'Subscription failed' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('subscribe: request failed', err)
    return res.status(502).json({ error: 'Subscription failed' })
  }
}
