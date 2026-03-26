// src/components/layout/main/recommend.tsx
import {
  recommendUsers,
  hotTags,
  activeUsers,
  hotPosts,
  notice,
  footerInfo,
} from '@/database/recommendData'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DialogDemo } from './dialog'

export default function Recommend() {
  const [followedSet, setFollowedSet] = useState<Set<string>>(new Set())

  const toggleFollow = (name: string) => {
    setFollowedSet((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }
  return (
    <aside className="flex w-72 flex-col gap-5 text-sm">
      <Card>
        <DialogDemo />
      </Card>

      <Card>
        <CardTitle>推荐滑手</CardTitle>
        <CardContent className="flex flex-col gap-3">
          {recommendUsers.map((user) => {
            const followed = followedSet.has(user.name)

            return (
              <div key={user.name} className="flex items-center justify-between">
                <div>
                  <div className="text-zinc-800">{user.name}</div>
                  <div className="text-xs text-zinc-400">{user.desc}</div>
                </div>
                <Button
                  variant={followed ? 'secondary' : 'outline'}
                  className={`text-xs ${
                    followed ? 'text-zinc-500' : 'text-blue-500 hover:text-blue-600'
                  }`}
                  onClick={() => toggleFollow(user.name)}
                >
                  {followed ? '已关注' : '关注'}
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardTitle>热门话题</CardTitle>
        <CardContent className="flex flex-wrap gap-2">
          {hotTags.map((tag) => (
            <Button
              key={tag}
              variant="secondary"
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-200"
            >
              {tag}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardTitle>活跃用户</CardTitle>
        <CardContent>
          <ol className="list-decimal">
            {activeUsers.map((name) => (
              <li key={name} className="mt-1">
                <span>{name}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardTitle>热门帖子</CardTitle>
        <div className="flex flex-col gap-3">
          {hotPosts.map((post) => (
            <h4
              key={post}
              className="hover:text-foreground cursor-pointer rounded-sm bg-blue-50 p-2 text-zinc-700"
            >
              {post}
            </h4>
          ))}
        </div>
      </Card>

      <Card className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-xs text-yellow-700">
        {notice.text}
      </Card>

      <footer className="flex flex-col flex-wrap items-center gap-1">
        <Button variant="link" className="px-2 text-xs text-zinc-400">
          {footerInfo.copyright}
        </Button>
        <ul className="flex">
          {footerInfo.links.map((link, index) => (
            <li key={index} className="flex items-center gap-1">
              <Button variant="link" className="px-2 text-xs text-zinc-400">
                {link}
              </Button>
              {index < footerInfo.links.length - 1 && <span className="select-none">·</span>}
            </li>
          ))}
        </ul>
      </footer>
    </aside>
  )
}
