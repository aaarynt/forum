// src/components/ui/commentCard.tsx
import type { TComment } from '@/database/types'
import { Button } from './button'
import {
  Card,
  CardAction,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from './card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverDescription,
} from './popover'
import Avatar from './avatar'
import { toast } from 'sonner'

export default function CommentCard({
  data,
  onLike,
}: {
  data: TComment
  onLike: (id: number) => void
}) {
  function formatTime(timestamp: number) {
    const date = new Date(timestamp)

    const M = date.getMonth() + 1
    const D = date.getDate()
    const H = String(date.getHours())
    const mm = String(date.getMinutes()).padStart(2, '0')

    return `${M}/${D} ${H}:${mm}`
  }
  async function copy(id: number) {
    const link = `https://SKATEBOARD_HUB/forum/${id}`
    try {
      await navigator.clipboard.writeText(link)
      toast.success('已复制链接!')
    } catch (err) {
      toast.error('Copy failed', err!)
    }
  }
  return (
    <Card size="default" className="px-0">
      <CardHeader className="flex items-center gap-3">
        <Avatar name={data.name} id={data.id} />
        <div>
          <CardTitle className="cursor-pointer text-sm text-zinc-800 hover:underline">
            {data.name}
          </CardTitle>
          <time dateTime={data.id.toString()} className="text-xs text-zinc-400">
            {formatTime(data.id)}
          </time>
        </div>
        <CardAction className="ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost">✖️</Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <PopoverHeader>
                <PopoverDescription className="flex flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.info('感谢反馈')
                    }}
                  >
                    不喜欢
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-800"
                    onClick={() => {
                      toast.info('感谢反馈')
                    }}
                  >
                    举报
                  </Button>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <CardTitle>{data.heading}</CardTitle>
        <p className="text-sm leading-relaxed text-zinc-700">{data.content}</p>
      </CardContent>

      <CardFooter className="items-center gap-4 py-2 text-xs text-zinc-500">
        <Button variant="outline" className="w-15">
          💬 {data.comments}
        </Button>
        <Button
          variant="outline"
          onClick={() => onLike(data.id)}
          className={`w-15 transition ${data.liked ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100' : 'text-zinc-500'}`}
        >
          ❤️ {data.likes}
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            copy(data.id)
          }}
        >
          share
        </Button>

        <CardDescription className="ml-auto text-zinc-400">{data.located}</CardDescription>
      </CardFooter>
    </Card>
  )
}
