export default function Me() {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4">
        <h1 className="text-lg font-semibold text-zinc-900">个人</h1>
        <p className="mt-1 text-sm text-zinc-500">个人主页占位页。</p>
      </header>

      <div className="rounded-xl bg-white/70 p-5">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-zinc-300" />
          <div>
            <div className="font-medium text-zinc-900">未命名用户</div>
            <div className="text-xs text-zinc-500">bio：这个人很懒，什么也没写</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="rounded-lg bg-white/60 py-3">
            <div className="font-semibold text-zinc-900">12</div>
            <div className="text-xs text-zinc-500">帖子</div>
          </div>
          <div className="rounded-lg bg-white/60 py-3">
            <div className="font-semibold text-zinc-900">34</div>
            <div className="text-xs text-zinc-500">关注</div>
          </div>
          <div className="rounded-lg bg-white/60 py-3">
            <div className="font-semibold text-zinc-900">56</div>
            <div className="text-xs text-zinc-500">粉丝</div>
          </div>
        </div>
      </div>
    </section>
  )
}
