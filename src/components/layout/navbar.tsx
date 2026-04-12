// src/components/layout/navbar.tsx
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="border-border bg-background/70 fixed inset-x-0 top-0 z-50 h-12 border-b backdrop-blur-md">
      <div className="relative mx-auto flex h-full w-full items-center justify-between px-20">
        <div className="flex items-center gap-4">
          <img src="/forum/小熊logo.png" alt="Bear Logo" className="size-9 object-contain" />
          <a href="/" className="text-foreground transition hover:opacity-80">
            SKATEBOARD HUB
          </a>
        </div>
        <ul className="text-muted-foreground flex items-center gap-6 text-sm">
          <li>
            <a href="/" className="hover:text-foreground transition">
              首页
            </a>
          </li>
          <li>
            <Link to="/forum" className="hover:text-foreground transition">
              论坛
            </Link>
          </li>
          <li>
            <Link to="/friends" className="hover:text-foreground transition">
              好友
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-foreground transition">
              设置
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
