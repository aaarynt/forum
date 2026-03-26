// src/components/layout/main/sidebar.tsx
import { HomeIcon, InfoIcon, UsersRoundIcon, UserCircle2Icon, SettingsIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: '主页', to: '/forum', icon: HomeIcon },
  { label: '通知', to: '/notifications', icon: InfoIcon },
  { label: '好友', to: '/friends', icon: UsersRoundIcon },
  { label: '个人', to: '/me', icon: UserCircle2Icon },
  { label: '设置', to: '/settings', icon: SettingsIcon },
]

export default function Sidebar() {
  return (
    <aside className="sticky top-16 flex h-[calc(100vh-4rem)] w-56 flex-col gap-2 py-6 text-sm">
      {navItems.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2 transition ${
                isActive
                  ? 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <Icon className="size-5" />
            {item.label}
          </NavLink>
        )
      })}
    </aside>
  )
}
