export default function Friends() {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4">
        <h1 className="text-lg font-semibold text-zinc-900">好友</h1>
        <p className="mt-1 text-sm text-zinc-500">示例好友列表（占位）。</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { name: '小明', status: '在线' },
          { name: '小红', status: '忙碌' },
          { name: '阿强', status: '离线' },
          { name: '小美', status: '在线' },
        ].map((u) => (
          <div key={u.name} className="rounded-xl bg-white/70 p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium text-zinc-900">{u.name}</div>
              <div className="text-xs text-zinc-500">{u.status}</div>
            </div>
            <div className="mt-2 text-xs text-zinc-500">最近动态：暂无</div>
          </div>
        ))}
      </div>
    </section>
  )
}
