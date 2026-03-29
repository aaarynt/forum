// src/components/layout/main/pages/me.tsx
import { useMemo, useState } from 'react'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import Avatar from '@/components/ui/my/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { TComment } from '@/database/types'
import { likedPosts, meProfile, myPosts } from '@/database/meData'
import { avatarIdFromName } from '@/lib/avatar'
import { PostItem } from '@/components/ui/my/postItem'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export default function Me() {
  const [tab, setTab] = useState<'posts' | 'likes'>('posts')
  const [posts, setPosts] = useState<TComment[]>(() => myPosts.map((p) => ({ ...p })))
  const [likes, setLikes] = useState<TComment[]>(() => likedPosts.map((p) => ({ ...p })))

  // ✅ 分页状态
  const [page, setPage] = useState(1)
  const pageSize = 7

  const currentList = tab === 'posts' ? posts : likes

  // ✅ 当前页数据
  const currentPageData = useMemo(() => {
    const start = (page - 1) * pageSize
    return currentList.slice(start, start + pageSize)
  }, [currentList, page])

  const stats = useMemo(() => {
    const postCount = posts.length
    const likedCount = likes.length
    const receivedLikes = posts.reduce((sum, p) => sum + p.likes, 0)
    return { postCount, likedCount, receivedLikes }
  }, [posts, likes])

  const toggleLikeInPosts = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1,
            }
          : p,
      ),
    )
  }

  const toggleLikeInLikes = (id: number) => {
    setLikes((prev) =>
      prev.flatMap((p) => {
        if (p.id !== id) return [p]
        const nextLiked = !p.liked
        const next = {
          ...p,
          liked: nextLiked,
          likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1,
        }
        return nextLiked ? [next] : []
      }),
    )
  }

  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      {/* header */}
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-foreground text-lg font-semibold">个人主页</h1>
          <p className="text-muted-foreground mt-1 text-sm">管理你的发布内容和你点过赞的帖子。</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <PencilIcon className="mr-1 size-4" />
              编辑资料
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>编辑资料</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <Input placeholder={meProfile.name} />
              <Input placeholder={meProfile.bio} />
              <Input placeholder={meProfile.located} />
            </div>

            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* profile */}
      <Card className="bg-card/70">
        <div className="flex items-start gap-4">
          <Avatar name={meProfile.name} id={avatarIdFromName(meProfile.name)} size={56} />
          <div className="flex-1">
            <div className="font-semibold">{meProfile.name}</div>
            <div className="text-muted-foreground text-sm">{meProfile.bio}</div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div>{stats.postCount} 发布</div>
              <div>{stats.receivedLikes} 获赞</div>
              <div>{stats.likedCount} 点赞</div>
            </div>
          </div>
        </div>
      </Card>

      {/* tab */}
      <div className="mt-4 flex gap-2">
        <Button variant={tab === 'posts' ? 'secondary' : 'ghost'} onClick={() => setTab('posts')}>
          发布({posts.length})
        </Button>
        <Button variant={tab === 'likes' ? 'secondary' : 'ghost'} onClick={() => setTab('likes')}>
          点赞({likes.length})
        </Button>
      </div>

      {/* list */}
      <div className="mt-4 flex flex-col gap-3">
        {currentPageData.length === 0 ? (
          <Card className="text-muted-foreground p-4 text-center text-sm">空</Card>
        ) : (
          currentPageData.map((p) => (
            <PostItem
              key={p.id}
              data={p}
              onLike={tab === 'posts' ? toggleLikeInPosts : toggleLikeInLikes}
              action={
                tab === 'posts' && (
                  <Button variant="ghost" size="sm">
                    <Trash2Icon />
                  </Button>
                )
              }
            />
          ))
        )}
      </div>

      <div className="mt-6 flex flex-row items-center justify-evenly">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          上一页
        </Button>

        <span className="text-muted-foreground text-sm">
          第 {page} / {Math.ceil(currentList.length / pageSize)} 页
        </span>

        <Button disabled={page === currentList.length} onClick={() => setPage((p) => p + 1)}>
          下一页
        </Button>
      </div>
    </section>
  )
}
