// src/components/ui/my/dialog.tsx
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon } from 'lucide-react'

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full rounded-lg bg-blue-500 py-2 text-sm font-medium text-white transition duration-300 hover:bg-blue-600 active:bg-blue-700">
            <PlusIcon />
            发布新帖子
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <FieldGroup className="px-2 py-4">
            <Field>
              <Input placeholder="请输入标题……" />
            </Field>
            <Field>
              <Textarea placeholder="分享你的灵感！" className="h-50" />
            </Field>
            <Field className="flex w-full flex-row gap-2">
              <Button className="flex-1 bg-purple-50 text-purple-500">图片</Button>
              <Button className="flex-1 bg-yellow-50 text-yellow-500">🌈 表情</Button>
              <Button className="flex-1 bg-green-50 text-green-500"># 标签</Button>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">取消发布</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
              发布
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
