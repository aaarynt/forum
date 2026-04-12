# Forum 项目优化方案

## 项目现状概览

当前是一个基于 **React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui** 的滑板社区论坛前端项目，包含以下页面：

- `/forum` - 论坛首页帖子流
- `/notifications` - 通知中心
- `/friends` - 好友列表和聊天
- `/me` - 个人主页
- `/settings` - 设置页面

---

## 一、项目结构优化

### 1.1 目录结构调整

```
src/
├── app/                          # 应用入口层
│   ├── App.tsx                   # 主应用组件
│   ├── providers/                # 全局 Providers
│   │   ├── index.tsx             # Provider 组合器
│   │   ├── theme-provider.tsx    # 主题 Provider（从 theme-bootstrap 重构）
│   │   └── notification-provider.tsx
│   └── layout.tsx                # 根布局
│
├── pages/                        # 页面层（按功能分组）
│   ├── forum/
│   │   ├── index.tsx             # comment.tsx 重命名
│   │   └── components/
│   ├── notifications/
│   │   ├── index.tsx
│   │   └── components/
│   ├── friends/
│   ├── me/
│   └── settings/
│
├── widgets/                      # 独立功能模块（可复用的复杂组件）
│   ├── pagination/               # 分页组件（提取重复逻辑）
│   ├── post-card/
│   ├── chat-dialog/
│   └── notification-card/
│
├── entities/                     # 业务实体
│   ├── comment/
│   │   ├── model/
│   │   │   ├── types.ts          # 从 database/types.ts 迁移
│   │   │   └── store.ts          # 评论状态管理
│   │   └── lib/
│   │       └── format-time.ts    # 提取重复的 formatTime
│   ├── user/
│   ├── notification/
│   └── friend/
│
├── shared/                       # 共享基础设施
│   ├── api/                      # 模拟 API 层
│   │   ├── client.ts             # 模拟请求客户端
│   │   └── endpoints/
│   ├── lib/
│   │   ├── utils.ts              # cn 函数等工具
│   │   ├── avatar.ts
│   │   └── hooks/                # 自定义 Hooks
│   │       ├── use-pagination.ts # 分页逻辑 Hook
│   │       └── use-local-storage.ts
│   ├── ui/                       # shadcn 组件
│   │   └── ...
│   └── config/
│       └── theme-presets.ts      # 精简后的主题配置
│
└── main.tsx
```

### 1.2 删除冗余文件

| 文件                    | 操作 | 原因                           |
| ----------------------- | ---- | ------------------------------ |
| `theme.md`              | 删除 | 与 `theme-presets.ts` 内容重复 |
| `notification-store.ts` | 合并 | 并入 provider 文件             |
| 重复的 formatTime 函数  | 提取 | 多处重复，应提取为工具函数     |

---

## 二、代码重构优化

### 2.1 提取通用 Hook: usePagination

**问题**: 分页逻辑在 3 个页面重复实现

**优化方案**:

```typescript
// src/shared/lib/hooks/use-pagination.ts
export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(items.length / pageSize)
  const currentItems = items.slice((page - 1) * pageSize, page * pageSize)

  return {
    page,
    setPage,
    totalPages,
    currentItems,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}
```

### 2.2 提取通用 Hook: useLocalStorage

**问题**: 设置页面的状态无法持久化

**优化方案**:

```typescript
// src/shared/lib/hooks/use-local-storage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
```

### 2.3 统一时间格式化

**问题**: `formatTime` 在两个组件中重复实现

**优化方案**:

```typescript
// src/entities/comment/lib/format-time.ts
export function formatTime(timestamp: number | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp)

  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')

  return `${M}/${D} ${H}:${mm}`
}
```

### 2.4 创建 Pagination 组件

**优化方案**:

```typescript
// src/widgets/pagination/index.tsx
interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="mt-6 flex flex-row items-center justify-evenly">
      <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        上一页
      </Button>
      <span className="px-2 text-sm">
        第 {page} / {totalPages} 页
      </span>
      <Button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        下一页
      </Button>
    </div>
  );
}
```

---

## 三、状态管理优化

### 3.1 使用 Zustand 替代 Context（可选）

**问题**: 当前使用 Context + useState 管理通知状态，扩展性有限

**优化方案**:

```typescript
// src/entities/notification/model/store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NotificationStore {
  items: TNotification[]
  unreadCount: number
  toggleRead: (id: number) => void
  markAllRead: () => void
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      items: mockNotifications,
      get unreadCount() {
        return get().items.filter((n) => !n.read).length
      },
      toggleRead: (id) =>
        set((state) => ({
          items: state.items.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
        })),
      markAllRead: () =>
        set((state) => ({
          items: state.items.map((n) => ({ ...n, read: true })),
        })),
    }),
    { name: 'notification-store' },
  ),
)
```

### 3.2 设置状态持久化

**问题**: 设置页面的开关状态刷新后丢失

**优化方案**:

```typescript
// src/entities/settings/model/store.ts
interface SettingsStore {
  notifications: NotificationPrefs
  privacy: PrivacyPrefs
  setNotifications: (prefs: NotificationPrefs) => void
  setPrivacy: (prefs: PrivacyPrefs) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      notifications: { reply: true, like: true, follow: true, system: true },
      privacy: { profileVisibleTo: 'public', allowDm: true, searchable: true },
      setNotifications: (prefs) => set({ notifications: prefs }),
      setPrivacy: (prefs) => set({ privacy: prefs }),
    }),
    { name: 'settings-store' },
  ),
)
```

---

## 四、性能优化

### 4.1 列表虚拟化（大量数据时）

**建议**: 当帖子数量超过 100 条时，使用 `@tanstack/react-virtual`

### 4.2 组件优化

**优化方案**:

```typescript
// CommentCard - 使用 memo 防止不必要渲染
export default memo(
  function CommentCard({ data, onLike }: CommentCardProps) {
    // ...
  },
  (prev, next) => {
    return prev.data.id === next.data.id && prev.data.liked === next.data.liked && prev.data.likes === next.data.likes
  },
)

// onLike 回调使用 useCallback
const handleLike = useCallback(
  (id: number) => {
    // ...
  },
  [setComments],
)
```

### 4.3 图片懒加载

**优化方案**:

```typescript
// 为头像组件添加懒加载
<img
  loading="lazy"
  src={avatarUrl}
  alt={name}
/>
```

---

## 五、UI/UX 优化

### 5.1 Navbar 链接修复

**问题**: 当前使用 `<a href="#">` 硬编码锚点，在 SPA 中会导致页面跳转问题

**优化方案**:

```typescript
// 使用 react-router 的 Link 或 NavLink
import { Link } from 'react-router-dom';

<Link to="/forum" className="...">论坛</Link>
```

### 5.2 添加加载骨架屏完善

**优化方案**:

```typescript
// 创建 SkeletonCard 组件
function SkeletonCard() {
  return (
    <Card className="space-y-3 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
    </Card>
  );
}
```

### 5.3 添加空状态组件

**优化方案**:

```typescript
// src/shared/ui/empty-state.tsx
interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-medium">{title}</h3>
      {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
```

### 5.4 添加错误边界

**优化方案**:

```typescript
// src/shared/ui/error-boundary.tsx
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>出错了，请刷新页面</div>;
    }
    return this.props.children;
  }
}
```

---

## 六、主题系统优化

### 6.1 精简主题配置

**问题**: `theme-presets.ts` 文件过大（485 行），包含大量重复 CSS 变量定义

**优化方案**:

```typescript
// 只保留主题差异配置，基础变量使用继承
const baseTheme = {
  light: {
    /* 基础亮色变量 */
  },
  dark: {
    /* 基础暗色变量 */
  },
}

const orangeTheme: ThemePreset = {
  id: 'orange',
  title: 'Orange',
  preview: ['#...', '#...', '#...', '#...'],
  overrides: {
    light: { '--primary': 'oklch(0.705 0.213 47.604)' },
    dark: { '--primary': 'oklch(0.646 0.222 41.116)' },
  },
}

// 合并逻辑
function applyTheme(preset: ThemePreset, mode: ThemeMode) {
  const vars = {
    ...baseTheme[mode],
    ...preset.overrides[mode],
  }
  // 应用到 DOM
}
```

### 6.2 添加主题过渡动画

**优化方案**:

```css
/* 平滑的主题切换过渡 */
* {
  transition:
    background-color 300ms ease,
    border-color 300ms ease,
    color 300ms ease;
}
```

---

## 七、TypeScript 类型优化

### 7.1 完善类型定义

**优化方案**:

```typescript
// src/shared/api/types.ts
// 定义 API 响应类型（为后续接入真实接口做准备）
export interface ApiResponse<T> {
  data: T
  message?: string
  code: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

// 使用更精确的类型
export type NotificationType = 'like' | 'reply' | 'follow' | 'system'

export interface TNotification {
  id: number
  type: NotificationType
  // ...
}
```

### 7.2 添加路径别名

**确保 tsconfig.json 配置正确**:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@/app/*": ["src/app/*"],
      "@/pages/*": ["src/pages/*"],
      "@/widgets/*": ["src/widgets/*"],
      "@/entities/*": ["src/entities/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}
```

---

## 八、可访问性 (A11y) 优化

### 8.1 按钮添加 aria-label

**优化方案**:

```typescript
<Button
  variant="ghost"
  onClick={() => onLike(data.id)}
  aria-label={data.liked ? '取消点赞' : '点赞'}
>
  <HeartIcon aria-hidden="true" />
  {data.likes}
</Button>
```

### 8.2 改善焦点管理

**优化方案**:

```css
/* 清晰的焦点样式 */
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### 8.3 语义化 HTML

**优化方案**:

```typescript
// 使用语义化标签
<article className="post-card">
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</article>
```

---

## 九、开发体验优化

### 9.1 ESLint 配置增强

**建议添加**:

```json
{
  "extends": ["plugin:react-hooks/recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "no-console": ["warn", { "allow": ["error"] }],
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 9.2 添加路径别名检查

**配置 vite.config.ts**:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@app': path.resolve(__dirname, 'src/app'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@widgets': path.resolve(__dirname, 'src/widgets'),
    '@entities': path.resolve(__dirname, 'src/entities'),
    '@shared': path.resolve(__dirname, 'src/shared'),
  },
}
```

### 9.3 添加开发工具

**建议安装**:

```bash
# React 开发者工具 (浏览器扩展)
# 已包含在依赖中的可以保留
npm install -D @types/node
```

---

## 十、实施优先级

### P0 - 核心重构（必须）

1. 提取通用 Hook (usePagination, useLocalStorage)
2. 统一时间格式化工具
3. 修复 Navbar 链接使用 react-router
4. 删除冗余的 theme.md 文件
5. 设置状态持久化

### P1 - 性能优化（重要）

1. 组件 memo 优化
2. useCallback/useMemo 优化
3. 创建 EmptyState 组件
4. 完善骨架屏

### P2 - 体验提升（推荐）

1. 添加错误边界
2. 可访问性改进
3. 主题配置精简
4. 类型定义完善

### P3 - 架构升级（可选）

1. 引入 Zustand 状态管理
2. 目录结构 FSD 改造
3. 列表虚拟化
4. API 层抽象

---

## 十一、依赖建议

### 可添加的依赖

```bash
# 状态管理（可选）
npm install zustand

# 表单处理（未来需要时）
npm install react-hook-form zod @hookform/resolvers

# 数据获取（未来需要时）
npm install @tanstack/react-query

# 虚拟列表（大量数据时）
npm install @tanstack/react-virtual
```

### 可移除的依赖

```bash
# 检查是否有未使用的依赖
npm install -D depcheck
npx depcheck
```

---

## 总结

本优化方案涵盖以下核心方向：

1. **代码复用**: 提取通用 Hook 和组件，消除重复代码
2. **状态管理**: 本地状态持久化，可选升级到 Zustand
3. **性能**: 组件优化、懒加载、虚拟化准备
4. **UX**: 完善的加载和空状态、错误边界
5. **可维护性**: 目录结构优化、类型完善、文档补充

建议按优先级逐步实施，先完成 P0 级别的核心重构，再逐步推进其他优化。
