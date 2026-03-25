# 📘 Forum 社区页面（React版）

## 📌 项目简介

本项目为课程小组竞赛中的“社区/论坛模块”，参考社交平台（如 [Twitter](https://x.com/) / [小红书](https://www.xiaohongshu.com/)）的结构，设计并实现一个三栏布局的前端页面。

该模块由本人独立负责，采用现代前端工程化方案开发，目标是在保证可展示性的同时，提升代码结构与可维护性。

## 🎯 功能需求

### 🧩 核心功能

- 三栏布局页面（Sidebar + Feed + Recommend）
- 帖子流展示（论坛首页）
- 帖子组件（头像、用户名、内容、点赞）
- 发帖功能（前端模拟）
- 热门推荐（用户 / 话题）

### 📄 页面结构

| 页面         | 路径           | 描述             |
| ------------ | -------------- | ---------------- |
| 首页（论坛） | /              | 帖子流展示       |
| 搜索         | /search        | 搜索内容（占位） |
| 通知         | /notifications | 通知列表（占位） |
| 私信         | /messages      | 聊天模块（占位） |
| 个人主页     | /profile/:id   | 用户信息 + 帖子  |

### 🚧 当前实现范围（前端阶段）

- 使用 mock 数据模拟帖子内容
- 点赞、发帖等为前端交互（无后端）
- 页面切换基于前端路由实现
- 暂未接入真实 API

## 🛠 技术栈

- [TypeScript v7.13.2](https://www.typescriptlang.org/)
- [Vite v8.0.2](https://vite.dev/)
- [React v19](https://react.dev/)
- [React Router v7.13.2](https://reactrouter.com/)
- [TailwindCSS v4.2.2](https://tailwindcss.com/)
- [shadcn-ui v4.1.0](https://ui.shadcn.com/)
- [Remix Icon v4.9.1](https://remixicon.com/)

## 🧠 技术设计说明

### 1️⃣ 路由方案

使用 HashRouter 实现前端路由，原因：

- 适配静态资源部署
- 避免服务器 404 问题
- 适合课程项目环境

### 2️⃣ 组件结构

项目采用组件化开发：

```
src/
├ components/
│   ├ Sidebar
│   ├ PostCard
│   ├ Feed
│   └ Recommend
├ pages/
│   ├ Home
│   ├ Search
│   ├ Profile
│   └ Messages
├ App.tsx
```

### 3️⃣ 数据方案

当前使用本地 mock 数据：

- 模拟帖子列表
- 模拟用户信息
- 后续可无缝替换为后端 API

## 🚀 运行方式

```
npm install
npm run dev
```

## 📦 构建与部署

```
npm run build
```

生成：

```
dist/
```

部署方式：

- 可直接作为静态资源部署到服务器
- 或使用简单静态服务运行

## ⚠️ 注意事项

- 本项目为课程作业，后端接口尚未对接
- 页面以展示效果为主，部分功能为模拟实现
- 若部署在子路径，请确保资源路径正确

## 📈 后续优化方向

- 接入真实后端 API
- 用户登录/注册系统
- 实时聊天（WebSocket）
- 推荐算法优化
- 状态管理优化（如引入全局状态）

## 👤 作者说明

本模块由本人独立完成，重点在于：

- 前端工程化能力
- 组件拆分与结构设计
- UI还原与交互实现
