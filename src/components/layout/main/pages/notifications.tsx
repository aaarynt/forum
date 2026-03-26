// src/components/layout/main/pages/notifications.tsx
import { useMemo, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { TNotification } from '@/database/types'
import { useNotificationStore } from '../notification-store'
import NotifyCard from '@/components/ui/my/notifitCard'

type FilterType = 'all' | TNotification['type']

function tabClassName(isActive: boolean) {
  return `inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm transition ${
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
  }`
}

function NotificationTab({ to, label, count }: { to: string; label: string; count: number }) {
  return (
    <NavLink to={to} className={({ isActive }) => tabClassName(isActive)}>
      {label}
      <span className="bg-foreground/10 rounded-full px-2 py-0.5 text-xs text-current/80">
        {count}
      </span>
    </NavLink>
  )
}

export default function Notifications() {
  const { items, markAllRead, unreadCount } = useNotificationStore()
  const [unreadOnly, setUnreadOnly] = useState(false)
  const { type } = useParams<{ type?: string }>()

  const filter = (type ?? 'reply') as FilterType
  const isValidFilter =
    filter === 'all' ||
    filter === 'like' ||
    filter === 'reply' ||
    filter === 'follow' ||
    filter === 'system'

  const filtered = useMemo(() => {
    const byType = filter === 'all' ? items : items.filter((n) => n.type === filter)
    return unreadOnly ? byType.filter((n) => !n.read) : byType
  }, [items, filter, unreadOnly])

  const counts = useMemo(() => {
    const all = items.length
    const like = items.filter((n) => n.type === 'like').length
    const reply = items.filter((n) => n.type === 'reply').length
    const follow = items.filter((n) => n.type === 'follow').length
    const system = items.filter((n) => n.type === 'system').length
    return { all, like, reply, follow, system }
  }, [items])

  const tabs = useMemo(
    () => [
      { to: '/notifications/all', label: '全部', count: counts.all },
      { to: '/notifications/reply', label: '回复', count: counts.reply },
      { to: '/notifications/like', label: '点赞', count: counts.like },
      { to: '/notifications/follow', label: '关注', count: counts.follow },
      { to: '/notifications/system', label: '系统', count: counts.system },
    ],
    [counts],
  )

  if (!isValidFilter) return <Navigate to="/notifications/reply" replace />

  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            data-slot="button-group"
            className="bg-card/60 ring-border flex rounded-lg p-1 ring-1"
          >
            {tabs.map((t) => (
              <NotificationTab key={t.to} to={t.to} label={t.label} count={t.count} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Button
              variant={unreadOnly ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setUnreadOnly((v) => !v)}
              disabled={unreadCount === 0}
            >
              仅看未读
            </Button>
            <Button variant="outline" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
              全部已读
            </Button>
          </div>
        </div>
      </header>
      {filtered.length === 0 && (
        <Card className="bg-card/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-foreground font-medium">暂无通知</div>
              <div className="text-muted-foreground mt-1 text-sm">
                这里会展示回复、点赞、关注和系统公告。
              </div>
            </div>
            <div className="bg-muted size-10 rounded-xl" />
          </div>
        </Card>
      )}

      <ul className="flex flex-col gap-3">
        {filtered.map((n) => {
          return (
            <li key={n.id}>
              <NotifyCard n={n} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
