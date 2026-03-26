// src/components/layout/main/pages/me.tsx
import { useMemo, useState } from 'react'
import { PencilIcon } from 'lucide-react'
import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { TComment } from '@/database/types'
import { likedPosts, meProfile, myPosts } from '@/database/meData'
import { avatarIdFromName } from '@/lib/avatar'
import { PostItem } from '@/components/ui/my/postItem'

export default function Me() {
  const [tab, setTab] = useState<'posts' | 'likes'>('posts')
  const [posts, setPosts] = useState<TComment[]>(() => myPosts.map((p) => ({ ...p })))
  const [likes, setLikes] = useState<TComment[]>(() => likedPosts.map((p) => ({ ...p })))

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
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-foreground text-lg font-semibold">个人主页</h1>
          <p className="text-muted-foreground mt-1 text-sm">管理你的发布内容和你点过赞的帖子。</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PencilIcon className="mr-1 size-4" />
            编辑资料
          </Button>
        </div>
      </header>

      <Card className="bg-card/70">
        <div className="flex items-start gap-4">
          <Avatar
            name={meProfile.name}
            id={avatarIdFromName(meProfile.name)}
            size={56}
            className="ring-border ring-1 select-none"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <div className="text-foreground text-base font-semibold">{meProfile.name}</div>
              <div className="text-muted-foreground text-sm">{meProfile.handle}</div>
              <span className="text-muted-foreground">·</span>
              <div className="text-muted-foreground text-sm">{meProfile.located}</div>
            </div>
            <div className="text-muted-foreground mt-1 text-sm">{meProfile.bio}</div>
            <div className="text-muted-foreground mt-2 text-xs">加入于 {meProfile.joinedAt}</div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-card/60 ring-border rounded-lg py-3 ring-1">
                <div className="text-foreground font-semibold">{stats.postCount}</div>
                <div className="text-muted-foreground text-xs">发布</div>
              </div>
              <div className="bg-card/60 ring-border rounded-lg py-3 ring-1">
                <div className="text-foreground font-semibold">{stats.receivedLikes}</div>
                <div className="text-muted-foreground text-xs">获赞</div>
              </div>
              <div className="bg-card/60 ring-border rounded-lg py-3 ring-1">
                <div className="text-foreground font-semibold">{stats.likedCount}</div>
                <div className="text-muted-foreground text-xs">点赞</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div data-slot="button-group" className="bg-card/60 ring-border flex rounded-lg p-1 ring-1">
          <Button
            variant={tab === 'posts' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setTab('posts')}
          >
            我发布的帖子
            <span className="bg-foreground/10 ml-2 rounded-full px-2 py-0.5 text-xs text-current/80">
              {posts.length}
            </span>
          </Button>
          <Button
            variant={tab === 'likes' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setTab('likes')}
          >
            我点赞的帖子
            <span className="bg-foreground/10 ml-2 rounded-full px-2 py-0.5 text-xs text-current/80">
              {likes.length}
            </span>
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {tab === 'posts' &&
          (posts.length === 0 ? (
            <Card className="bg-card/70">
              <div className="text-foreground font-medium">还没有发布任何帖子</div>
              <div className="text-muted-foreground mt-1 text-sm">
                点右上角“发帖”开始分享你的第一条内容。
              </div>
            </Card>
          ) : (
            posts.map((p) => (
              <PostItem
                key={p.id}
                data={p}
                onLike={toggleLikeInPosts}
                action={
                  <Button variant="ghost" size="sm">
                    管理
                  </Button>
                }
              />
            ))
          ))}

        {tab === 'likes' &&
          (likes.length === 0 ? (
            <Card className="bg-card/70">
              <div className="text-foreground font-medium">还没有点赞过帖子</div>
              <div className="text-muted-foreground mt-1 text-sm">
                在论坛里看到喜欢的内容就点个赞吧。
              </div>
            </Card>
          ) : (
            likes.map((p) => <PostItem key={p.id} data={p} onLike={toggleLikeInLikes} />)
          ))}
      </div>
    </section>
  )
}
