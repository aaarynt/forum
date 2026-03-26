// src/components/layout/main/pages/not-found.tsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <h1 className="text-lg font-semibold text-zinc-900">页面不存在</h1>
      <p className="mt-1 text-sm text-zinc-500">你访问的路由没有匹配到页面。</p>
      <Link
        to="/forum"
        className="mt-4 inline-flex items-center rounded-lg bg-black/5 px-4 py-2 text-sm text-zinc-800 hover:bg-black/10"
      >
        返回主页
      </Link>
    </section>
  )
}
