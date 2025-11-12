import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

app.use(express.json())

// Newsletter signup endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email, timestamp } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    const newsletterFile = join(__dirname, 'newsletter-signups.md')
    const entry = `- ${email} - ${timestamp}\n`

    // Check if file exists, if not create it with a header
    try {
      await fs.access(newsletterFile)
    } catch {
      await fs.writeFile(newsletterFile, '# Newsletter Signups\n\n')
    }

    // Append the email
    await fs.appendFile(newsletterFile, entry)

    console.log(`Newsletter signup: ${email}`)
    res.json({ success: true })
  } catch (error) {
    console.error('Error saving newsletter signup:', error)
    res.status(500).json({ error: 'Failed to save email' })
  }
})

app.listen(PORT, () => {
  console.log(`Newsletter API running on http://localhost:${PORT}`)
})
