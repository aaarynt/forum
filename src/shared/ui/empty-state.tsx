import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, action, className = '' }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
      role="status"
      aria-live="polite"
    >
      {icon && <div className="text-muted-foreground mb-4">{icon}</div>}
      <h3 className="text-foreground text-lg font-medium">{title}</h3>
      {description && <p className="text-muted-foreground mt-1 max-w-md text-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

// 预定义的空状态配置
export const EmptyStates = {
  noComments: {
    title: '暂无评论',
    description: '还没有人发表内容，成为第一个吧！',
  },
  noNotifications: {
    title: '暂无通知',
    description: '这里会展示回复、点赞、关注和系统公告。',
  },
  noFriends: {
    title: '暂无好友',
    description: '添加好友开始聊天吧！',
  },
  noPosts: {
    title: '暂无帖子',
    description: '还没有发布任何内容。',
  },
  noLikes: {
    title: '暂无点赞',
    description: '还没有点赞任何内容。',
  },
} as const
