import { useState, useEffect } from 'react'

const FEED_URL = 'https://feeds.behold.so/EChkujxRiyLZeLNrVo1Y'

const InstagramFeed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(FEED_URL)
      .then(res => res.json())
      .then(data => {
        setPosts((data.posts || []).slice(0, 6))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <main id="main" className="min-h-screen bg-surface-primary text-auto p-8">
        <p className="kol-mono-14 text-fg-48">Loading feed...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main id="main" className="min-h-screen bg-surface-primary text-auto p-8">
        <p className="kol-mono-14 text-status-danger">Error: {error}</p>
      </main>
    )
  }

  return (
    <main id="main" className="min-h-screen bg-surface-primary text-auto p-8">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-12">
          <p className="kol-mono-10 text-fg-48 uppercase tracking-widest mb-2">Demo</p>
          <h1 className="kol-sans-heading-02">Instagram Feed</h1>
          <p className="kol-mono-14 text-fg-64 mt-4">
            {posts.length} posts from Behold API
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(post => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-[4/5] overflow-hidden rounded bg-fg-04"
            >
              <img
                src={post.sizes?.medium?.mediaUrl || post.mediaUrl}
                alt={post.prunedCaption || 'Instagram post'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {post.mediaType === 'VIDEO' && (
                <div className="absolute top-2 right-2 bg-black/60 rounded px-2 py-1">
                  <span className="kol-mono-10 text-white">Video</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}

export default InstagramFeed
