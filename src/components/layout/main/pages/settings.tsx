export default function Settings() {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1">
      <header className="mb-4">
        <h1 className="text-lg font-semibold text-zinc-900">设置</h1>
        <p className="mt-1 text-sm text-zinc-500">随便放几个设置项做占位。</p>
      </header>

      <div className="flex flex-col gap-3">
        {[
          { title: '主题', desc: '浅色 / 深色（占位）' },
          { title: '消息提醒', desc: '开启 / 关闭（占位）' },
          { title: '隐私', desc: '谁可以看到我的主页（占位）' },
        ].map((s) => (
          <div key={s.title} className="rounded-xl bg-white/70 p-4">
            <div className="font-medium text-zinc-900">{s.title}</div>
            <div className="mt-1 text-sm text-zinc-500">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
