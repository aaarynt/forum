// src/components/ui/my/commentCard.tsx
import { HeartIcon, HeartOffIcon, MessageSquareIcon, Share2Icon, ShieldAlertIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { TComment } from '@/database/types'
import { avatarIdFromName } from '@/lib/avatar'
import { Button } from '../button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTrigger } from '../popover'
import Avatar from './avatar'
import CommentDialog from './commentDialog'

export default function CommentCard({ data, onLike }: { data: TComment; onLike: (id: number) => void }) {
  const [openComments, setOpenComments] = useState(false)
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
  function spliceComment(str: string, num: number): string {
    return str.length >= num ? str.slice(0, num) + ' ...' : str
  }
  return (
    <Card size="default" className="bg-card/70 border-border hover:bg-card/90 border px-0 transition">
      <CardHeader className="flex flex-wrap items-center gap-3">
        <Avatar name={data.name} id={avatarIdFromName(data.name)} />
        <div>
          <CardTitle className="text-foreground cursor-pointer text-sm font-semibold hover:underline">
            {data.name}
          </CardTitle>
          <time dateTime={data.id.toString()} className="text-muted-foreground text-xs">
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
                    <HeartOffIcon />
                    不喜欢
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-800"
                    onClick={() => {
                      toast.info('感谢反馈')
                    }}
                  >
                    <ShieldAlertIcon />
                    举报
                  </Button>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground flex flex-col gap-1">
        <CardTitle>{data.heading}</CardTitle>
        <p className="text-muted-foreground text-sm leading-relaxed">{spliceComment(data.content, 140)}</p>
      </CardContent>

      <CardFooter className="text-muted-foreground items-center gap-4 py-2 text-xs">
        <Button variant="outline" className="w-15" onClick={() => setOpenComments(true)}>
          <MessageSquareIcon />
          {data.comments}
        </Button>
        <Button
          variant="outline"
          onClick={() => onLike(data.id)}
          className={`w-15 transition ${data.liked ? 'border-red-200 bg-red-50 text-red-500! hover:bg-red-100' : 'text-muted-foreground'}`}
        >
          <HeartIcon />
          {data.likes}
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            copy(data.id)
          }}
        >
          <Share2Icon />
        </Button>

        <CardDescription className="text-muted-foreground ml-auto">{data.located}</CardDescription>
      </CardFooter>

      <CommentDialog open={openComments} onOpenChange={setOpenComments} count={data.comments} />
    </Card>
  )
}
