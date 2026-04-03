// src/components/ui/my/notifitCard.tsx
import type { TNotification } from '@/database/types'
import { Card } from '../card'
import { HeartIcon, MegaphoneIcon, MessageSquareIcon, UserPlusIcon } from 'lucide-react'
import Avatar from './avatar'
import { Button } from '../button'
import { useNotificationStore } from '@/components/layout/main/notification-store'

export default function NotifyCard({ n }: { n: TNotification }) {
  const { toggleRead } = useNotificationStore()
  function typeMeta(type: TNotification['type']) {
    switch (type) {
      case 'like':
        return { label: '点赞', Icon: HeartIcon, cls: 'bg-rose-50 text-rose-600 ring-rose-100' }
      case 'reply':
        return {
          label: '回复',
          Icon: MessageSquareIcon,
          cls: 'bg-blue-50 text-blue-600 ring-blue-100',
        }
      case 'follow':
        return {
          label: '关注',
          Icon: UserPlusIcon,
          cls: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
        }
      case 'system':
        return {
          label: '系统',
          Icon: MegaphoneIcon,
          cls: 'bg-amber-50 text-amber-700 ring-amber-100',
        }
    }
  }
  function formatTime(iso: string) {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleString(undefined, {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const meta = typeMeta(n.type)
  if (!meta) return null
  return (
    <Card size="sm" className={`bg-card/70 hover:bg-card/85 transition ${n.read ? '' : 'ring-primary/20'}`}>
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 inline-flex size-9 items-center justify-center rounded-xl ring-1 ${meta.cls}`}
          title={meta.label}
          aria-label={meta.label}
        >
          <meta.Icon className="size-4" />
        </div>

        {n.from ? (
          <Avatar name={n.from.name} id={n.from.avatarId} size={36} className="ring-border mt-0.5 shrink-0 ring-1" />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-foreground truncate font-medium">
                {n.from?.name ? (
                  <>
                    <span className="text-foreground">{n.from.name}</span>
                    <span className="text-muted-foreground"> · </span>
                  </>
                ) : null}
                {n.title}
              </div>
              <div className="text-muted-foreground mt-1 line-clamp-2 text-sm">{n.content}</div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <div className="text-muted-foreground text-xs">{formatTime(n.createdAt)}</div>
              {!n.read && <span className="bg-destructive size-2 rounded-full" />}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => toggleRead(n.id)}>
              {n.read ? '标为未读' : '标为已读'}
            </Button>
            <span className="text-muted-foreground text-xs">·</span>
            <Button variant="link" size="xs" className="px-0">
              查看详情
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
