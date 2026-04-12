import { useMemo, useState } from 'react'

export interface UsePaginationReturn<T> {
  page: number
  setPage: (page: number | ((prev: number) => number)) => void
  totalPages: number
  currentItems: T[]
  hasNext: boolean
  hasPrev: boolean
  goToNext: () => void
  goToPrev: () => void
  resetPage: () => void
}

export function usePagination<T>(items: T[], pageSize: number): UsePaginationReturn<T> {
  const [page, setPage] = useState(1)

  const totalPages = useMemo(() => Math.max(1, Math.ceil(items.length / pageSize)), [items.length, pageSize])

  // 当数据变化时，确保页码不超出范围
  const safePage = useMemo(() => Math.min(page, totalPages), [page, totalPages])

  const currentItems = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, safePage, pageSize])

  const hasNext = safePage < totalPages
  const hasPrev = safePage > 1

  const goToNext = () => setPage((p) => Math.min(p + 1, totalPages))
  const goToPrev = () => setPage((p) => Math.max(p - 1, 1))
  const resetPage = () => setPage(1)

  return {
    page: safePage,
    setPage,
    totalPages,
    currentItems,
    hasNext,
    hasPrev,
    goToNext,
    goToPrev,
    resetPage,
  }
}
