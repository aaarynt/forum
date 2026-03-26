// src/components/layout/main/sidebar.tsx
import { HomeIcon, InfoIcon, UsersRoundIcon, UserCircle2Icon, SettingsIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useNotificationStore } from './notification-store'

const navItems = [
  { label: '主页', to: '/forum', icon: HomeIcon },
  { label: '通知', to: '/notifications', icon: InfoIcon },
  { label: '好友', to: '/friends', icon: UsersRoundIcon },
  { label: '个人', to: '/me', icon: UserCircle2Icon },
  { label: '设置', to: '/settings', icon: SettingsIcon },
]

export default function Sidebar() {
  const { unreadCount } = useNotificationStore()
  return (
    <aside className="bg-background/80 sticky top-16 flex h-[calc(100vh-4rem)] w-56 flex-col gap-2 py-6 text-sm backdrop-blur transition-colors duration-500">
      {navItems.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 ${
                isActive
                  ? 'bg-accent text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
              }`
            }
          >
            <Icon className="size-5 opacity-80 group-hover:opacity-100" />
            <span className="flex-1">{item.label}</span>
            {item.label === '通知' && unreadCount > 0 && (
              <span className="bg-primary text-background rounded-full px-2 py-0.5 text-xs font-medium">
                {unreadCount}
              </span>
            )}
          </NavLink>
        )
      })}
    </aside>
  )
}
