'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TipTapEditor from './Editor/TipTapEditor'

interface Post {
  id: number
  title: string
  excerpt: string
  content: string
  postDate: string | null
  coverImageUrl: string | null
  published: boolean
}

interface PostEditorProps {
  post?: Post
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [postDate, setPostDate] = useState(
    post?.postDate || new Date().toISOString().split('T')[0]
  )
  const [published, setPublished] = useState(post?.published ?? true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const url = post
        ? `/api/posts/${post.id}`
        : '/api/posts'
      const method = post ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          date: postDate,
        }),
      })

      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save post')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-24">
      {/* Title - minimalistic, no label, red color */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
        className="w-full text-4xl font-bold text-primary bg-transparent border-none focus:outline-none placeholder:text-primary/30"
        required
      />

      {/* Date field */}
      <div className="flex items-center gap-2">
        <label htmlFor="postDate" className="text-text/60 text-sm">
          Date:
        </label>
        <input
          id="postDate"
          type="date"
          value={postDate}
          onChange={(e) => setPostDate(e.target.value)}
          className="px-3 py-1 border border-muted-border rounded bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          required
        />
      </div>

      {/* Content editor - full width, minimal toolbar */}
      <div className="min-h-[60vh]">
        <TipTapEditor content={content} onChange={setContent} />
      </div>

      {/* Bottom bar - simple Save and Cancel */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-muted-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="quote-button px-4 py-2"
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={saving}
            className="quote-button px-6 py-2"
          >
            {saving ? 'SAVING...' : 'SAVE'}
          </button>
        </div>
      </div>

      {error && (
        <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}
    </form>
  )
}

