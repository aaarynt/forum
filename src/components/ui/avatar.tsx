// src/components/ui/avatar.tsx
import { cn } from '@/lib/utils' // 如果你有这个工具
import { getAvatarStyleById } from '@/database/avator' // 你的方法
import { avatarIdFromName } from '@/lib/avatar'

type AvatarProps = {
  name: string
  id?: number
  size?: number // 可扩展
  className?: string
}

export default function Avatar({ name, id, size = 40, className }: AvatarProps) {
  const stableId = id ?? avatarIdFromName(name)
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-bold',
        getAvatarStyleById(stableId),
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.5,
      }}
    >
      {name[0]?.toUpperCase()}
    </div>
  )
}
