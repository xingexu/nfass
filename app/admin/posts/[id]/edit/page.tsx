import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import PostEditor from '@/components/PostEditor'
import LogoScrollBar from '@/components/LogoScrollBar'

export default async function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  })

  if (!post) {
    redirect('/admin/posts')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LogoScrollBar />
      
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <PostEditor post={post} />
        </div>
      </div>
    </div>
  )
}

