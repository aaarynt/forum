import { useMemo, useState } from 'react'
import { HeartIcon, MessageSquareIcon, PencilIcon, PlusIcon } from 'lucide-react'

import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { TComment } from '@/database/types'
import { likedPosts, meProfile, myPosts } from '@/database/meData'
import { avatarIdFromName } from '@/lib/avatar'

type MeTabKey = 'posts' | 'likes'

function formatTime(timestamp: number) {
  const date = new Date(timestamp)
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = String(date.getHours())
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${M}/${D} ${H}:${mm}`
}

function PostItem({
  data,
  onLike,
  action,
}: {
  data: TComment
  onLike: (id: number) => void
  action?: React.ReactNode
}) {
  return (
    <Card size="default" className="bg-white/70 px-0 transition hover:bg-white/85">
      <div className="flex items-start gap-3 px-4">
        <Avatar
          name={data.name}
          id={avatarIdFromName(data.name)}
          size={40}
          className="mt-0.5 ring-1 ring-zinc-200 select-none"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="truncate font-medium text-zinc-900">{data.heading}</div>
                <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                  {data.located}
                </span>
              </div>
              <div className="mt-1 line-clamp-2 text-sm text-zinc-600">{data.content}</div>
            </div>
            <div className="shrink-0 text-xs text-zinc-400">{formatTime(data.id)}</div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MessageSquareIcon className="mr-1 size-4" />
              {data.comments}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLike(data.id)}
              className={`transition ${data.liked ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
            >
              <HeartIcon className="mr-1 size-4" />
              {data.likes}
            </Button>
            <div className="ml-auto">{action}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Me() {
  const [tab, setTab] = useState<MeTabKey>('posts')
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
          <h1 className="text-lg font-semibold text-zinc-900">个人主页</h1>
          <p className="mt-1 text-sm text-zinc-500">管理你的发布内容和你点过赞的帖子。</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PencilIcon className="mr-1 size-4" />
            编辑资料
          </Button>
          <Button size="sm">
            <PlusIcon className="mr-1 size-4" />
            发帖
          </Button>
        </div>
      </header>

      <Card className="bg-white/70">
        <div className="flex items-start gap-4">
          <Avatar
            name={meProfile.name}
            id={avatarIdFromName(meProfile.name)}
            size={56}
            className="ring-1 ring-zinc-200 select-none"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <div className="text-base font-semibold text-zinc-900">{meProfile.name}</div>
              <div className="text-sm text-zinc-500">{meProfile.handle}</div>
              <span className="text-zinc-300">·</span>
              <div className="text-sm text-zinc-500">{meProfile.located}</div>
            </div>
            <div className="mt-1 text-sm text-zinc-600">{meProfile.bio}</div>
            <div className="mt-2 text-xs text-zinc-400">加入于 {meProfile.joinedAt}</div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-lg bg-white/60 py-3">
                <div className="font-semibold text-zinc-900">{stats.postCount}</div>
                <div className="text-xs text-zinc-500">发布</div>
              </div>
              <div className="rounded-lg bg-white/60 py-3">
                <div className="font-semibold text-zinc-900">{stats.receivedLikes}</div>
                <div className="text-xs text-zinc-500">获赞</div>
              </div>
              <div className="rounded-lg bg-white/60 py-3">
                <div className="font-semibold text-zinc-900">{stats.likedCount}</div>
                <div className="text-xs text-zinc-500">点赞</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div
          data-slot="button-group"
          className="flex rounded-lg bg-white/60 p-1 ring-1 ring-zinc-200"
        >
          <Button
            variant={tab === 'posts' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setTab('posts')}
          >
            我发布的帖子
            <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs text-current/80">
              {posts.length}
            </span>
          </Button>
          <Button
            variant={tab === 'likes' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setTab('likes')}
          >
            我点赞的帖子
            <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs text-current/80">
              {likes.length}
            </span>
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {tab === 'posts' &&
          (posts.length === 0 ? (
            <Card className="bg-white/70">
              <div className="font-medium text-zinc-900">还没有发布任何帖子</div>
              <div className="mt-1 text-sm text-zinc-500">
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
            <Card className="bg-white/70">
              <div className="font-medium text-zinc-900">还没有点赞过帖子</div>
              <div className="mt-1 text-sm text-zinc-500">在论坛里看到喜欢的内容就点个赞吧。</div>
            </Card>
          ) : (
            likes.map((p) => <PostItem key={p.id} data={p} onLike={toggleLikeInLikes} />)
          ))}
      </div>
    </section>
  )
}
