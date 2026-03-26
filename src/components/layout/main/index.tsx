// src/components/layout/index.tsx
import Sidebar from './sidebar'
import Comment from './pages/comment'
import Friends from './pages/friends'
import Me from './pages/me'
import NotFound from './pages/not-found'
import Notifications from './pages/notifications'
import Settings from './pages/settings'
import Recommend from './recommend'
import { Route, Routes } from 'react-router-dom'
export default function Main() {
  return (
    <main className="mx-auto flex w-full max-w-6xl gap-6 px-4 pt-16">
      <Sidebar />
      <Routes>
        <Route path="/forum" element={<Comment />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/me" element={<Me />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Recommend />
    </main>
  )
}
