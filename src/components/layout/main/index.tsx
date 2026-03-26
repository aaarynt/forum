// src/components/layout/index.tsx
import Sidebar from './sidebar'
import Comment from './pages/comment'
import Friends from './pages/friends'
import Me from './pages/me'
import NotFound from './pages/not-found'
import Notifications from './pages/notifications'
import Settings from './pages/settings'
import Recommend from './recommend'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotificationProvider from './notification-provider'

export default function Main() {
  return (
    <NotificationProvider>
      <main className="mt-14 flex w-full flex-row gap-6 px-4">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/forum" replace />} />
          <Route path="/forum" element={<Comment />} />
          <Route path="/notifications" element={<Navigate to="/notifications/reply" replace />} />
          <Route path="/notifications/:type" element={<Notifications />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/me" element={<Me />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Recommend />
      </main>
    </NotificationProvider>
  )
}
