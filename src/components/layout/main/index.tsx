// src/components/layout/index.tsx
import Sidebar from './sidebar'
import Comment from './pages/comment'
import Recommend from './recommend'
export default function Main() {
  return (
    <main className="mx-auto flex w-full max-w-6xl gap-6 px-4 pt-16">
      <Sidebar />
      <Comment />
      <Recommend />
    </main>
  )
}
