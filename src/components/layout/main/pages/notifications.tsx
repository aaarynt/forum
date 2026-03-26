import { useMemo, useState } from 'react'
import { HeartIcon, MessageSquareIcon, MegaphoneIcon, UserPlusIcon } from 'lucide-react'
import { Navigate, NavLink, useParams } from 'react-router-dom'

import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { mockNotifications } from '@/database/notificationData'
import type { TNotification } from '@/database/types'

type FilterType = 'all' | TNotification['type']

function tabClassName(isActive: boolean) {
  return `inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm transition ${
    isActive ? 'bg-blue-500 text-white' : 'text-zinc-600 hover:text-zinc-100'
  }`
}

function NotificationTab({ to, label, count }: { to: string; label: string; count: number }) {
  return (
    <NavLink to={to} className={({ isActive }) => tabClassName(isActive)}>
      {label}
      <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-current/80">{count}</span>
    </NavLink>
  )
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

export default function Notifications() {
  const [items, setItems] = useState<TNotification[]>(() => mockNotifications)
  const [unreadOnly, setUnreadOnly] = useState(false)
  const { type } = useParams<{ type?: string }>()

  const filter = (type ?? 'reply') as FilterType
  const isValidFilter =
    filter === 'all' ||
    filter === 'like' ||
    filter === 'reply' ||
    filter === 'follow' ||
    filter === 'system'

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items])
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

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  const toggleRead = (id: number) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))

  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            data-slot="button-group"
            className="flex rounded-lg bg-white/60 p-1 ring-1 ring-zinc-200"
          >
            {tabs.map((t) => (
              <NotificationTab key={t.to} to={t.to} label={t.label} count={t.count} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                未读 {unreadCount}
              </span>
            )}
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
          <p className="mt-1 text-sm text-gray-50">把重要动态集中在一个收件箱里。</p>
        </div>
      </header>

      {filtered.length === 0 ? (
        <Card className="bg-white/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-medium text-zinc-900">暂无通知</div>
              <div className="mt-1 text-sm text-zinc-500">
                这里会展示回复、点赞、关注和系统公告。
              </div>
            </div>
            <div className="size-10 rounded-xl bg-zinc-100" />
          </div>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((n) => {
            const meta = typeMeta(n.type)
            return (
              <li key={n.id}>
                <Card
                  size="sm"
                  className={`bg-white/70 transition hover:bg-white/85 ${
                    n.read ? '' : 'ring-zinc-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 inline-flex size-9 items-center justify-center rounded-xl ring-1 ${meta.cls}`}
                      title={meta.label}
                      aria-label={meta.label}
                    >
                      <meta.Icon className="size-4" />
                    </div>

                    {n.from ? (
                      <Avatar
                        name={n.from.name}
                        id={n.from.avatarId}
                        size={36}
                        className="mt-0.5 shrink-0 ring-1 ring-zinc-200"
                      />
                    ) : (
                      <div className="mt-0.5 size-9 shrink-0 rounded-full bg-zinc-200 ring-1 ring-zinc-200" />
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate font-medium text-zinc-900">
                            {n.from?.name ? (
                              <>
                                <span className="text-zinc-900">{n.from.name}</span>
                                <span className="text-zinc-400"> · </span>
                              </>
                            ) : null}
                            {n.title}
                          </div>
                          <div className="mt-1 line-clamp-2 text-sm text-zinc-600">{n.content}</div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <div className="text-xs text-zinc-400">{formatTime(n.createdAt)}</div>
                          {!n.read && <span className="size-2 rounded-full bg-blue-500" />}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="ghost" size="xs" onClick={() => toggleRead(n.id)}>
                          {n.read ? '标为未读' : '标为已读'}
                        </Button>
                        <span className="text-xs text-zinc-400">·</span>
                        <Button variant="link" size="xs" className="px-0">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
