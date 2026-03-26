# Forum

一个基于 `React + Vite + TypeScript` 的滑板社区前端原型。

## 项目简介

当前项目以“社区 / 论坛”场景为核心，做了一个三栏式页面和多路由前端界面，重点展示：

- 论坛首页帖子流
- 通知中心
- 好友聊天弹窗
- 个人主页与发布内容
- 设置页与主题切换

项目目前以 `mock` 数据驱动，主要用于前端展示和交互演示，尚未接入真实后端。

## 页面路由

- `/forum` - 论坛首页
- `/notifications/:type` - 通知中心，支持 `reply` / `like` / `follow` / `system`
- `/friends` - 好友列表和聊天弹窗
- `/me` - 个人主页
- `/settings` - 设置页面

## 功能

- 三栏布局：Sidebar + 主内容 + 推荐栏
- 帖子卡片：头像、用户名、内容、点赞、评论
- 通知卡片：分类筛选、未读状态、已读切换
- 好友聊天：点击好友卡片弹出聊天窗口，支持历史消息展示
- 个人主页：发布内容、点赞内容、编辑资料弹窗
- 设置页：通知设置、隐私设置、修改密码、退出 / 注销、浅色 / 深色切换

## 技术栈

- `React 19`
- `TypeScript`
- `Vite`
- `React Router`
- `Tailwind CSS`
- `shadcn/radix-ui`
- `next-themes`
- `sonner`

## 运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 说明

- 页面内容主要依赖 `src/database/` 下的 mock 数据
- 所有交互当前都在前端完成，便于后续替换为真实接口
- 如果部署到子路径，需要注意静态资源路径配置
