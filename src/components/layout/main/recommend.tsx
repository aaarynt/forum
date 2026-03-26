// src/components/layout/main/recommend.tsx
import { useState } from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DialogDemo } from '@/components/ui/my/dialog'
import {
  recommendUsers,
  hotTags,
  activeUsers,
  hotPosts,
  notice,
  footerInfo,
} from '@/database/recommendData'

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
      <Card className="bg-card/80 backdrop-blur">
        <DialogDemo />
      </Card>

      <Card>
        <CardTitle>推荐滑手</CardTitle>
        <CardContent className="flex flex-col gap-3">
          {recommendUsers.map((user) => {
            const followed = followedSet.has(user.name)

            return (
              <div
                key={user.name}
                className="hover:bg-accent/60 flex items-center justify-between rounded-md px-2 py-1 transition-colors"
              >
                <div>
                  <div className="text-foreground">{user.name}</div>
                  <div className="text-muted-foreground text-xs">{user.desc}</div>
                </div>

                <Button
                  variant={followed ? 'secondary' : 'outline'}
                  size="sm"
                  className="text-xs"
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
              size="xs"
              className="rounded-full px-3 py-1 text-xs"
            >
              {tag}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardTitle>活跃用户</CardTitle>
        <CardContent>
          <ol className="text-muted-foreground list-decimal space-y-1 pl-4">
            {activeUsers.map((name) => (
              <li key={name} className="text-foreground">
                {name}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardTitle>热门帖子</CardTitle>
        <CardContent className="flex flex-col gap-2">
          {hotPosts.map((post) => (
            <div
              key={post}
              className="text-foreground bg-muted hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-sm transition-colors"
            >
              {post}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-muted text-muted-foreground text-xs">
        <CardContent>{notice.text}</CardContent>
      </Card>

      <Footer />
    </aside>
  )
}

const Footer = () => {
  return (
    <footer className="text-muted-foreground flex flex-col items-center gap-1 text-xs">
      <Button variant="link" className="text-muted-foreground px-2 text-xs">
        {footerInfo.copyright}
      </Button>

      <ul className="flex items-center">
        {footerInfo.links.map((link, index) => (
          <li key={index} className="flex items-center gap-1">
            <Button variant="link" className="text-muted-foreground px-2 text-xs">
              {link}
            </Button>
            {index < footerInfo.links.length - 1 && (
              <span className="text-muted-foreground select-none">·</span>
            )}
          </li>
        ))}
      </ul>
    </footer>
  )
}
