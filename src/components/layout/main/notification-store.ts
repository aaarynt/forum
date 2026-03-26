import { createContext, useContext } from 'react'
import type { TNotification } from '@/database/types'

export type NotificationStore = {
  items: TNotification[]
  unreadCount: number
  toggleRead: (id: number) => void
  markAllRead: () => void
}

export const NotificationContext = createContext<NotificationStore | null>(null)

export function useNotificationStore() {
  const store = useContext(NotificationContext)
  if (!store) {
    throw new Error('useNotificationStore must be used within NotificationProvider')
  }
  return store
}
