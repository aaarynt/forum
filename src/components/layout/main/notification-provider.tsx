// src/components/layout/main/notification-provider.tsx
import { useMemo, useState } from 'react'
import { mockNotifications } from '@/database/notificationData'
import type { TNotification } from '@/database/types'
import { NotificationContext } from './notification-store'

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TNotification[]>(() => mockNotifications)

  const toggleRead = (id: number) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items])

  const value = useMemo(
    () => ({
      items,
      unreadCount,
      toggleRead,
      markAllRead,
    }),
    [items, unreadCount],
  )

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
