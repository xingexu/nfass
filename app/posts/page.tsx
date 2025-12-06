import prisma from "@/lib/prisma"
import Link from "next/link"
import LogoScrollBar from "@/components/LogoScrollBar"
import Header from "@/components/posts/Header"
import PostsEmpty from "@/components/posts/PostsEmpty"
import PostDeleteButton from "@/components/PostDeleteButton"

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { date: "desc" }
  })

  return (
    <div className="min-h-screen bg-background">
      <LogoScrollBar />
      
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <Header />

        {/* Posts List */}
        {posts.length === 0 ? (
          <PostsEmpty />
        ) : (
          <div className="space-y-8">
            {posts.map((post: any) => {
              const postDate = new Date(post.date)
              const formattedDate = postDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
              
              // Extract text content from HTML
              const textContent = post.content.replace(/<[^>]*>/g, '')
              const previewText = textContent.substring(0, 300)
              
              return (
                <article 
                  key={post.id} 
                  className="bg-white rounded-xl p-8 md:p-10 border border-neutral-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 pr-6">
                      <Link href={`/posts/${post.id}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 hover:text-primary transition-colors leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                          {post.title || 'Untitled Post'}
                        </h2>
                      </Link>
                      <div className="flex items-center gap-2 text-text-muted text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <time>{formattedDate}</time>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2.5 rounded-lg border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all hover:scale-105"
                        title="Edit"
                      >
                        <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <PostDeleteButton postId={post.id} />
                    </div>
                  </div>
                  
                  <div className="text-text/70 leading-relaxed mb-6 text-base" style={{ fontFamily: 'var(--font-body)' }}>
                    <p className="line-clamp-4">{previewText}</p>
                  </div>
                  
                  <div className="pt-6 border-t border-neutral-200">
                    <Link
                      href={`/posts/${post.id}`}
                      className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-medium text-sm group/link"
                    >
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
