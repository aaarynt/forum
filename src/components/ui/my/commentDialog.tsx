// src/components/ui/my/comment-dialog.tsx
import { useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CommentComment } from '@/database/commentComment'

export default function CommentDialog({
  open,
  onOpenChange,
  count,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  count: number
}) {
  const comments = useMemo(() => {
    const arr = [...CommentComment]

    for (let i = arr.length - 1; i > 0; i--) {
      // eslint-disable-next-line react-hooks/purity
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }

    return arr.slice(0, count)
  }, [count])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg!">
        <DialogHeader>
          <DialogTitle>评论区（{count}）</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-120 flex-col gap-2 overflow-y-auto pr-1">
          {comments.map((c) => (
            <div
              key={`${c.name}-${c.time}-${c.text}`}
              className="bg-card/70 border-border hover:bg-card/90 rounded-lg border p-3 transition"
            >
              <div className="flex items-center justify-between">
                <div className="text-foreground text-sm font-medium">{c.name}</div>
                <div className="text-muted-foreground text-xs">{c.time}</div>
              </div>

              <div className="text-muted-foreground mt-1 text-sm leading-relaxed">{c.text}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
