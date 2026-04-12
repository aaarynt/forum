// src/components/layout/main/pages/me.tsx
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Avatar from '@/components/ui/my/avatar'
import { PostItem } from '@/components/ui/my/postItem'
import {
  likedPosts as initialLikedPosts,
  myPosts as initialMyPosts,
  meProfile as initialProfile,
} from '@/database/meData'
import type { TComment, TmeProfile } from '@/database/types'
import { avatarIdFromName } from '@/lib/avatar'
import { usePagination } from '@/shared/lib/hooks/use-pagination'
import { EmptyState } from '@/shared/ui/empty-state'
import { Pagination } from '@/widgets/pagination'

type TabType = 'posts' | 'likes'

export default function Me() {
  const [tab, setTab] = useState<TabType>('posts')
  const [posts, setPosts] = useState<TComment[]>(() => initialMyPosts.map((p) => ({ ...p })))
  const [likes, setLikes] = useState<TComment[]>(() => initialLikedPosts.map((p) => ({ ...p })))
  const [profile, setProfile] = useState<TmeProfile>(initialProfile)

  // 编辑资料的状态
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: profile.name,
    bio: profile.bio,
    located: profile.located,
  })

  const currentList = tab === 'posts' ? posts : likes

  const { page, setPage, totalPages, currentItems: currentPageData } = usePagination(currentList, 7)

  const stats = useMemo(() => {
    const postCount = posts.length
    const likedCount = likes.length
    const receivedLikes = posts.reduce((sum, p) => sum + p.likes, 0)
    return { postCount, likedCount, receivedLikes }
  }, [posts, likes])

  const toggleLikeInPosts = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1,
            }
          : p,
      ),
    )
  }

  const toggleLikeInLikes = (id: number) => {
    setLikes((prev) =>
      prev.flatMap((p) => {
        if (p.id !== id) return [p]
        const nextLiked = !p.liked
        const next = {
          ...p,
          liked: nextLiked,
          likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1,
        }
        return nextLiked ? [next] : []
      }),
    )
  }

  const handleTabChange = (newTab: TabType) => {
    setTab(newTab)
    setPage(1)
  }

  // 保存编辑的资料
  const handleSaveProfile = () => {
    if (!editForm.name.trim()) {
      toast.error('昵称不能为空')
      return
    }

    setProfile((prev) => ({
      ...prev,
      name: editForm.name.trim(),
      bio: editForm.bio.trim(),
      located: editForm.located.trim(),
    }))

    setEditDialogOpen(false)
    toast.success('资料已更新')
  }

  // 打开编辑对话框时初始化表单
  const handleOpenEdit = () => {
    setEditForm({
      name: profile.name,
      bio: profile.bio,
      located: profile.located,
    })
    setEditDialogOpen(true)
  }

  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      {/* header */}
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-foreground text-lg font-semibold">个人主页</h1>
          <p className="text-muted-foreground mt-1 text-sm">管理你的发布内容和你点过赞的帖子。</p>
        </div>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleOpenEdit}>
              <PencilIcon className="mr-1 size-4" />
              编辑资料
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>编辑资料</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">昵称</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="请输入昵称"
                  maxLength={20}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">个人简介</Label>
                <Input
                  id="bio"
                  value={editForm.bio}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="介绍一下自己"
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="located">所在地</Label>
                <Input
                  id="located"
                  value={editForm.located}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, located: e.target.value }))}
                  placeholder="你在哪个城市"
                  maxLength={20}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveProfile}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* profile */}
      <Card className="bg-card/70">
        <div className="flex items-start gap-4">
          <Avatar name={profile.name} id={avatarIdFromName(profile.name)} size={56} />
          <div className="flex-1">
            <div className="font-semibold">{profile.name}</div>
            <div className="text-muted-foreground text-sm">{profile.bio}</div>
            <div className="text-muted-foreground mt-1 text-xs">📍 {profile.located}</div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div>{stats.postCount} 发布</div>
              <div>{stats.receivedLikes} 获赞</div>
              <div>{stats.likedCount} 点赞</div>
            </div>
          </div>
        </div>
      </Card>

      {/* tab */}
      <div className="mt-4 flex gap-2">
        <Button variant={tab === 'posts' ? 'secondary' : 'ghost'} onClick={() => handleTabChange('posts')}>
          发布({posts.length})
        </Button>
        <Button variant={tab === 'likes' ? 'secondary' : 'ghost'} onClick={() => handleTabChange('likes')}>
          点赞({likes.length})
        </Button>
      </div>

      {/* list */}
      <div className="mt-4 flex flex-col gap-3">
        {currentPageData.length === 0 ? (
          <Card className="p-4">
            <EmptyState
              title={tab === 'posts' ? '暂无发布' : '暂无点赞'}
              description={tab === 'posts' ? '还没有发布任何内容。' : '还没有点赞任何内容。'}
            />
          </Card>
        ) : (
          currentPageData.map((p) => (
            <PostItem
              key={p.id}
              data={p}
              onLike={tab === 'posts' ? toggleLikeInPosts : toggleLikeInLikes}
              action={
                tab === 'posts' && (
                  <Button variant="ghost" size="sm">
                    <Trash2Icon />
                  </Button>
                )
              }
            />
          ))
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  )
}
