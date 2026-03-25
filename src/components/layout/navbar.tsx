// src/components/layout/navbar.tsx
export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-14 border-b border-black/5 bg-white/70 backdrop-blur-md">
      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src="/forum/小熊logo.png" alt="Bear Logo" className="size-9 object-contain" />
        </div>

        <a
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-base font-semibold tracking-tight text-black"
        >
          SKATEBOARD HUB
        </a>

        <ul className="flex items-center gap-6 text-sm text-black/70">
          <li>
            <a href="/" className="transition hover:text-black">
              首页
            </a>
          </li>

          <li>
            <a href="#skatepark" className="transition hover:text-black">
              场地
            </a>
          </li>

          <li>
            <a href="#comments" className="transition hover:text-black">
              论坛
            </a>
          </li>

          <li>
            <a href="#contact" className="transition hover:text-black">
              联系
            </a>
          </li>

          <li>
            <a
              href="/profile"
              className="flex size-9 items-center justify-center rounded-full border border-black/10 bg-black/5 transition hover:bg-black/10"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-black/70">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
