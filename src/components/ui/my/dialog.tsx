// src/components/ui/my/dialog.tsx
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { TComment } from '@/database/types'

interface PostDialogProps {
  onPost?: (post: TComment) => void
}

export function DialogDemo({ onPost }: PostDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('请输入标题')
      return
    }
    if (!content.trim()) {
      toast.error('请输入内容')
      return
    }

    // 创建新帖子，使用时间戳作为ID
    const newPost: TComment = {
      id: Date.now(),
      name: '我', // 当前用户
      located: '本地',
      heading: title.trim(),
      content: content.trim(),
      likes: 0,
      comments: 0,
      liked: false,
    }

    onPost?.(newPost)
    toast.success('发布成功！')
    setTitle('')
    setContent('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button className="bg-primary/90 hover:bg-primary/95 active:bg-primary text-primary-foreground w-full rounded-lg py-2 text-sm font-medium transition duration-300">
            <PlusIcon />
            发布新帖子
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <FieldGroup className="px-2 py-4">
            <Field>
              <Input
                placeholder="请输入标题……"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
              />
            </Field>
            <Field>
              <Textarea
                placeholder="分享你的灵感！"
                className="h-50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={500}
              />
            </Field>
            <Field className="flex w-full flex-row gap-2">
              <Button type="button" className="flex-1 bg-purple-50 text-purple-600" disabled>
                图片
              </Button>
              <Button type="button" className="flex-1 bg-yellow-50 text-yellow-600" disabled>
                🌈 表情
              </Button>
              <Button type="button" className="flex-1 bg-green-50 text-green-600" disabled>
                # 标签
              </Button>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                取消发布
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-primary/90 hover:bg-primary/95 active:bg-primary"
              disabled={!title.trim() || !content.trim()}
            >
              发布
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
