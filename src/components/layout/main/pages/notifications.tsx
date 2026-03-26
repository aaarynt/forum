export default function Notifications() {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4">
        <h1 className="text-lg font-semibold text-zinc-900">通知</h1>
        <p className="mt-1 text-sm text-zinc-500">这里先放一些占位内容，后面再接真实数据。</p>
      </header>

      <ul className="flex flex-col gap-3">
        {['有人赞了你的帖子', '有人回复了你', '系统公告：欢迎使用论坛'].map((text, i) => (
          <li key={i} className="rounded-xl bg-white/70 p-4 text-sm text-zinc-700">
            {text}
          </li>
        ))}
      </ul>
    </section>
  )
}
