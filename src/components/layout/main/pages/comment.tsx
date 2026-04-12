// src/components/layout/main/pages/comment.tsx
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import CommentCard from '@/components/ui/my/commentCard'
import { Skeleton } from '@/components/ui/skeleton'
import { mockComments } from '@/database/commentData'
import type { TComment } from '@/database/types'
import { usePagination } from '@/shared/lib/hooks/use-pagination'
import { EmptyState } from '@/shared/ui/empty-state'
import { Pagination } from '@/widgets/pagination'

// ✅ 随机延迟函数
function sleepRandom(min: number, max: number) {
  const time = Math.random() * (max - min) + min
  return new Promise((resolve) => setTimeout(resolve, time))
}

// 骨架屏组件
function CommentSkeleton() {
  const heights = [140, 160, 120, 180, 150, 130]
  return (
    <div className="flex flex-col gap-5">
      {heights.map((h, i) => (
        <Skeleton key={i} className="w-full rounded-xl" style={{ height: `${h}px` }} />
      ))}
    </div>
  )
}

export default function Comment() {
  const [comments, setComments] = useState<TComment[]>([])
  const [loading, setLoading] = useState(true)

  const { page, setPage, totalPages, currentItems: pagedComments } = usePagination(comments, 5)

  // ✅ 初始加载（模拟请求）
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      setLoading(true)
      await sleepRandom(200, 1000)
      if (!cancelled) {
        setComments(mockComments)
        setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
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
      {loading && <CommentSkeleton />}

      {/* ✅ 空状态 */}
      {!loading && comments.length === 0 && (
        <EmptyState
          title="暂无内容"
          description="还没有人发表评论，成为第一个吧！"
          action={
            <Button variant="outline" onClick={() => window.location.reload()}>
              刷新页面
            </Button>
          }
        />
      )}

      {/* ✅ 列表 */}
      {!loading && comments.length > 0 && (
        <div className="flex flex-col gap-4">
          {pagedComments.map((item) => (
            <CommentCard key={item.id} data={item} onLike={handleLike} />
          ))}
        </div>
      )}

      {/* ✅ 分页 */}
      {!loading && comments.length > 0 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
    </section>
  )
}
