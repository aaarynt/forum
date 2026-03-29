// src/components/layout/main/pages/comment.tsx
import { useEffect, useState } from 'react'
import { mockComments } from '@/database/commentData'
import type { TComment } from '@/database/types'
import CommentCard from '@/components/ui/my/commentCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

// ✅ 随机延迟函数
function sleepRandom(min: number, max: number) {
  const time = Math.random() * (max - min) + min
  return new Promise((resolve) => setTimeout(resolve, time))
}

export default function Comment() {
  const [comments, setComments] = useState<TComment[]>([])
  const [loading, setLoading] = useState(true)
  const [heights] = useState(() => Array.from({ length: 6 }).map(() => (Math.floor(Math.random() * 11) + 35) * 4))
  const [page, setPage] = useState(1)
  const pageSize = 5
  const pagedComments = comments.slice((page - 1) * pageSize, page * pageSize)

  // ✅ 初始加载（模拟请求）
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await sleepRandom(200, 1000)
      setComments(mockComments)
      setLoading(false)
    })()
  }, [])

  // ✅ 点赞
  const handleLike = (id: number) => {
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
    <section className="mx-auto w-full max-w-3xl flex-1">
      {/* ✅ loading 状态 */}
      {loading && (
        <div className="text-red- flex flex-col gap-5">
          {heights.map((h, i) => (
            <Skeleton key={i} className="w-full rounded-xl" style={{ height: `${h}px` }} />
          ))}
        </div>
      )}

      {/* ✅ 空状态 */}
      {!loading && comments.length === 0 && (
        <div className="py-10 text-center text-sm text-zinc-400 italic">NO COMMENT</div>
      )}

      {/* ✅ 列表 */}
      {!loading && comments.length > 0 && (
        <div className="flex flex-col gap-4">
          {pagedComments.map((item) => (
            <CommentCard key={item.id} data={item} onLike={handleLike} />
          ))}
        </div>
      )}
      <div className="mt-6 flex flex-row items-center justify-evenly">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          上一页
        </Button>
        <span className="px-2 text-sm">
          第 {page} / {Math.ceil(comments.length / pageSize)} 页
        </span>
        <Button disabled={page * pageSize >= comments.length} onClick={() => setPage((p) => p + 1)}>
          下一页
        </Button>
      </div>
    </section>
  )
}
