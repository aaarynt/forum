import { Button } from '@/components/ui/button'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  showInfo?: boolean
  className?: string
}

export function Pagination({ page, totalPages, onPageChange, showInfo = true, className = '' }: PaginationProps) {
  // 如果只有一页，不显示分页
  if (totalPages <= 1) return null

  return (
    <div className={`mt-6 flex flex-row items-center justify-evenly ${className}`}>
      <Button variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        上一页
      </Button>

      {showInfo && (
        <span className="text-muted-foreground px-2 text-sm">
          第 {page} / {totalPages} 页
        </span>
      )}

      <Button variant="outline" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        下一页
      </Button>
    </div>
  )
}
