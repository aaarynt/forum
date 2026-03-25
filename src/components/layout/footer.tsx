// src/components/layout/footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-4 gap-8 text-sm text-black/60">

          <div>
            <h4 className="mb-3 text-sm font-semibold text-black">关于</h4>
            <p className="leading-relaxed">Skateboard Hub 是一个滑板社区，分享技巧、地点与日常。</p>
          </div>


          <div>
            <h4 className="mb-3 text-sm font-semibold text-black">导航</h4>
            <ul className="space-y-2">
              <li>
                <a href="#comments" className="hover:text-black">
                  论坛
                </a>
              </li>
              <li>
                <a href="#skatepark" className="hover:text-black">
                  场地
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-black">
                  商店
                </a>
              </li>
            </ul>
          </div>

          {/* 支持 */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-black">支持</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-black">
                  帮助中心
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  使用条款
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  隐私政策
                </a>
              </li>
            </ul>
          </div>

          {/* 联系 */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-black">联系</h4>
            <ul className="space-y-2">
              <li>shop@skateboardhub.com</li>
              <li>400-123-4567</li>
            </ul>
          </div>
        </div>

        {/* 底部 */}
        <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-4 text-xs text-black/40">
          <span>© 2026 Skateboard Hub</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-black">
              条款
            </a>
            <a href="#" className="hover:text-black">
              隐私
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
