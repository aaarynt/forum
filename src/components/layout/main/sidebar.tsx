// src/components/layout/main/sidebar.tsx
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const items = ['主页', '通知', '好友', '个人', '设置']
  const toMap: Record<(typeof items)[number], string> = {
    主页: '/forum',
    通知: '/notifications',
    好友: '/friends',
    个人: '/me',
    设置: '/settings',
  }

  return (
    <aside className="sticky top-16 flex h-[calc(100vh-4rem)] w-56 flex-col gap-2 py-6 text-sm">
      {items.map((item) => (
        <NavLink
          key={item}
          to={toMap[item]}
          end={toMap[item] === '/'}
          className={({ isActive }) =>
            `flex items-center gap-6 rounded-lg px-4 py-2 text-xl transition ${
              isActive
                ? 'bg-black/5 font-medium text-black'
                : 'text-black/60 hover:bg-black/5 hover:text-black'
            }`
          }
        >
          <span className="size-4 rounded bg-black/30" />
          {item}
        </NavLink>
      ))}
    </aside>
  )
}
