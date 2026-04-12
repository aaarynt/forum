// src/components/layout/index.tsx
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { mockComments } from '@/database/commentData'
import type { TComment } from '@/database/types'
import NotificationProvider from './notification-provider'
import Comment from './pages/comment'
import Friends from './pages/friends'
import Me from './pages/me'
import NotFound from './pages/not-found'
import Notifications from './pages/notifications'
import Settings from './pages/settings'
import Recommend from './recommend'
import Sidebar from './sidebar'

export default function Main() {
  // 管理帖子状态
  const [comments, setComments] = useState<TComment[]>(() => {
    // 按时间戳降序排序，最新的在前
    return [...mockComments].sort((a, b) => b.id - a.id)
  })

  // 发布新帖子
  const handleNewPost = (post: TComment) => {
    setComments((prev) => [post, ...prev])
  }

  // 删除帖子
  const handleDeletePost = (id: number) => {
    setComments((prev) => prev.filter((item) => item.id !== id))
  }

  // 点赞帖子
  const handleLikePost = (id: number) => {
    setComments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
              liked: !item.liked,
            }
          : item,
      ),
    )
  }

  return (
    <NotificationProvider>
      <main className="mt-14 flex w-full flex-row gap-6 px-4">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/forum" replace />} />
          <Route
            path="/forum"
            element={<Comment comments={comments} onDelete={handleDeletePost} onLike={handleLikePost} />}
          />
          <Route path="/notifications" element={<Navigate to="/notifications/all" replace />} />
          <Route path="/notifications/:type" element={<Notifications />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/me" element={<Me />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Recommend onNewPost={handleNewPost} />
      </main>
    </NotificationProvider>
  )
}
