// src/components/layout/main/pages/friends.tsx
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Avatar from '@/components/ui/my/avatar'
import { friendChats } from '@/database/friendsData'
import type { TFriendChat, TFriendMessage } from '@/database/types'

export default function Friends() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)

  const activeFriend = useMemo(() => friendChats.find((f) => f.id === activeId) ?? friendChats[0], [activeId])

  const openChat = (id: number) => {
    setActiveId(id)
    setOpen(true)
  }

  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4">
        <h1 className="text-foreground text-lg font-semibold">好友</h1>
        <p className="text-muted-foreground mt-1 text-sm">点击好友卡片开始聊天。</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {friendChats.map((u) => (
          <Card
            key={u.id}
            className="bg-card/70 hover:bg-card/85 cursor-pointer p-4 transition"
            role="button"
            tabIndex={0}
            onClick={() => openChat(u.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openChat(u.id)
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={u.name} id={u.avatarId} size={36} className="ring-border ring-1" />
                <div>
                  <div className="text-foreground font-medium">{u.name}</div>
                  <div className="text-muted-foreground text-xs">{u.status}</div>
                </div>
              </div>
              <span className="bg-foreground/10 text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {u.messages.length} 条
              </span>
            </div>
            <div className="text-muted-foreground mt-2 line-clamp-1 text-xs">
              最近：{u.messages[u.messages.length - 1]?.text}
            </div>
          </Card>
        ))}
      </div>

      <Chat open={open} onOpenChange={setOpen} friend={activeFriend} />
    </section>
  )
}

const Chat = ({
  open,
  onOpenChange,
  friend,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  friend: TFriendChat
}) => {
  if (!friend) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg!">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar name={friend.name} id={friend.avatarId} size={40} className="ring-border ring-1" />
            <div>
              <div className="text-foreground text-base font-semibold">{friend.name}</div>
              <div className="text-muted-foreground text-xs">{friend.status}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="bg-muted/40 flex max-h-120 flex-col gap-3 overflow-y-auto rounded-lg p-3">
          {friend.messages.map((m: TFriendMessage) => (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[70%]">
                <div
                  className={`rounded-xl px-3 py-2 text-sm ${m.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'}`}
                >
                  {m.text}
                </div>
                <div className={`text-muted-foreground mt-1 text-xs ${m.from === 'me' ? 'text-right' : 'text-left'}`}>
                  {m.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 输入框 */}
        <div className="mt-3 flex items-center gap-2">
          <Input placeholder="输入消息" />
          <Button>发送</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
