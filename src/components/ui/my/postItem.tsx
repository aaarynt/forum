// src/components/ui/my/postItem.tsx
import type { TComment } from '@/database/types'
import { Card } from '../card'
import Avatar from './avatar'
import { avatarIdFromName } from '@/lib/avatar'
import { Button } from '../button'
import { HeartIcon, MessageSquareIcon } from 'lucide-react'

export function PostItem({
  data,
  onLike,
  action,
}: {
  data: TComment
  onLike: (id: number) => void
  action?: React.ReactNode
}) {
  function formatTime(timestamp: number) {
    const date = new Date(timestamp)
    const M = date.getMonth() + 1
    const D = date.getDate()
    const H = String(date.getHours())
    const mm = String(date.getMinutes()).padStart(2, '0')
    return `${M}/${D} ${H}:${mm}`
  }

  return (
    <Card size="default" className="bg-card/70 hover:bg-card/85 px-0 transition">
      <div className="flex items-start gap-3 px-4">
        <Avatar
          name={data.name}
          id={avatarIdFromName(data.name)}
          size={40}
          className="ring-border mt-0.5 ring-1 select-none"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-foreground truncate font-medium">{data.heading}</div>
                <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-xs">
                  {data.located}
                </span>
              </div>
              <div className="text-muted-foreground mt-1 line-clamp-2 text-sm">{data.content}</div>
            </div>
            <div className="text-muted-foreground shrink-0 text-xs">{formatTime(data.id)}</div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MessageSquareIcon className="mr-1 size-4" />
              {data.comments}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLike(data.id)}
              className={`transition ${data.liked ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
            >
              <HeartIcon className="mr-1 size-4" />
              {data.likes}
            </Button>
            <div className="ml-auto">{action}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
