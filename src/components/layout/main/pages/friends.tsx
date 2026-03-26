export default function Friends() {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4">
        <h1 className="text-foreground text-lg font-semibold">好友</h1>
        <p className="text-muted-foreground mt-1 text-sm">示例好友列表（占位）。</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { name: '小明', status: '在线' },
          { name: '小红', status: '忙碌' },
          { name: '阿强', status: '离线' },
          { name: '小美', status: '在线' },
        ].map((u) => (
          <div key={u.name} className="rounded-xl bg-card/70 p-4">
            <div className="flex items-center justify-between">
              <div className="text-foreground font-medium">{u.name}</div>
              <div className="text-muted-foreground text-xs">{u.status}</div>
            </div>
            <div className="text-muted-foreground mt-2 text-xs">最近动态：暂无</div>
          </div>
        ))}
      </div>
    </section>
  )
}
