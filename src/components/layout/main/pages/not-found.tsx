// src/components/layout/main/pages/not-found.tsx
import { GhostIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function NotFound() {
  return (
    <section className="w-full">
      <div className="fixed inset-0 flex items-center justify-center">
        {' '}
        <Card className="border-border bg-card/70 w-full max-w-md -translate-y-12 shadow-2xl backdrop-blur">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="bg-muted flex size-14 items-center justify-center rounded-xl">
              <GhostIcon className="text-primary size-6" />
            </div>

            <h1 className="text-foreground text-lg font-semibold">页面不存在</h1>

            <p className="text-muted-foreground text-sm leading-relaxed">
              你访问的页面可能已被删除、重命名，或者链接错误。
            </p>

            <div className="mt-2 flex gap-2">
              <Button asChild variant="default">
                <Link to="/forum">返回主页</Link>
              </Button>

              <Button asChild variant="outline">
                <Link to="/">回到入口</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
