import prisma from "@/lib/prisma"
import LogoScrollBar from "@/components/LogoScrollBar"
import PostContent from "@/components/PostContent"

export default async function SinglePost({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id }
  })

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <LogoScrollBar />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <p className="text-text/60">Post not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <LogoScrollBar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-text mb-2">{post.title}</h1>
        <p className="text-text/60 mb-6">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <PostContent content={post.content} />
      </div>
    </div>
  )
}

