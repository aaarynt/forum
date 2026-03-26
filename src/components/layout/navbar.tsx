// src/components/layout/navbar.tsx
export default function Navbar() {
  return (
    <nav className="border-border bg-background/70 fixed inset-x-0 top-0 z-50 h-14 border-b backdrop-blur-md">
      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src="/forum/小熊logo.png" alt="Bear Logo" className="size-9 object-contain" />
        </div>

        <a
          href="/"
          className="text-foreground absolute left-1/2 -translate-x-1/2 text-base font-semibold tracking-tight"
        >
          SKATEBOARD HUB
        </a>

        <ul className="text-muted-foreground flex items-center gap-6 text-sm">
          <li>
            <a href="/" className="hover:text-foreground transition">
              首页
            </a>
          </li>

          <li>
            <a href="#skatepark" className="hover:text-foreground transition">
              场地
            </a>
          </li>

          <li>
            <a href="#comments" className="hover:text-foreground transition">
              论坛
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-foreground transition">
              联系
            </a>
          </li>

          <li>
            <a
              href="/profile"
              className="bg-muted border-border hover:bg-muted/80 flex size-9 items-center justify-center rounded-full border transition"
            >
              <svg viewBox="0 0 24 24" className="fill-muted-foreground size-4">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
