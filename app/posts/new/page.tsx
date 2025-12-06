"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import LogoScrollBar from "@/components/LogoScrollBar"
import TipTapEditor from "@/components/Editor/TipTapEditor"

export default function NewPost() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [saving, setSaving] = useState(false)

  const wordCount = useMemo(() => {
    const text = content.replace(/<[^>]*>/g, '')
    return text.trim() ? text.trim().split(/\s+/).length : 0
  }, [content])

  const charCount = useMemo(() => {
    const text = content.replace(/<[^>]*>/g, '')
    return text.length
  }, [content])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, date })
      })

      router.push("/posts")
    } catch (err) {
      console.error(err)
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <LogoScrollBar />
      <div className="w-full max-w-[95vw] mx-auto px-4 py-4">
        <div className="bg-surface border border-muted-border rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-primary/5 border-b border-muted-border px-6 py-3">
            <h1 className="text-4xl font-bold text-primary">
              WRITE
            </h1>
          </div>

          <form onSubmit={submit} className="p-6 space-y-4">
            {/* Date and Title Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-2 border-muted-border p-2 rounded-lg bg-background text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="TITLE"
                className="w-full border-2 border-muted-border p-2 rounded-lg bg-background text-primary text-2xl font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-primary placeholder:opacity-60"
                required
              />
            </div>

            {/* Content Section */}
            <div className="border-2 border-muted-border rounded-lg p-4 bg-background focus-within:border-primary transition-all">
              <TipTapEditor content={content} onChange={setContent} />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-3 border-t border-muted-border">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/posts")}
                  className="quote-button-black px-6 py-2.5"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="quote-button-black px-8 py-2.5"
                >
                  {saving ? "SAVING..." : "SAVE"}
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={saving}
                  className="quote-button-black px-8 py-2.5"
                >
                  PUBLISH
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
