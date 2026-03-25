// src/components/layout/main/sidebar.tsx
export default function Sidebar() {
  const items = ['主页', '通知', '好友', '个人', '设置']

  return (
    <aside className="sticky top-16 flex h-[calc(100vh-4rem)] w-56 flex-col gap-2 py-6 text-sm">
      {items.map((item, i) => (
        <a
          key={item}
          href="#"
          className={`flex items-center gap-3 rounded-lg px-4 py-2 transition ${
            i === 0
              ? 'bg-black/5 font-medium text-black'
              : 'text-black/60 hover:bg-black/5 hover:text-black'
          }`}
        >
          <span className="size-4 rounded bg-black/30" />
          {item}
        </a>
      ))}
    </aside>
  )
}
