import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getBlogPostBySlug } from '../lib/queries'
import ArticleLayout from '../components/prose/layouts/ArticleLayout'
import CmsGlobal from '../components/sections/blog/CmsGlobal'
import LoaderOverlay from '../components/layout/LoaderOverlay'

export default function StackDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setNotFound(false)

      try {
        console.log('Fetching blog post with slug:', slug)
        const postData = await getBlogPostBySlug(slug)
        console.log('Received post data:', postData)

        if (!cancelled && postData) {
          setPost(postData)
          setLoading(false)
          return
        }

        console.log('No post data received for slug:', slug)
      } catch (error) {
        console.error(`Unable to load blog post ${slug} from Sanity`, error)
      }

      if (cancelled) return

      setNotFound(true)
      setLoading(false)
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (notFound) {
    return <Navigate to="/stack" replace />
  }

  if (loading) {
    return <LoaderOverlay message="Loading post" />
  }

  if (!post) {
    return (
      <div className="min-h-screen w-full pt-[72px] px-6 lg:px-10 flex items-center justify-center">
        <p>Post not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full pt-[72px]">
      <ArticleLayout post={post} />
      <CmsGlobal />
    </main>
  )
}
