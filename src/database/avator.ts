// src/database/avator.ts
export function getAvatarStyleById(id: number) {
  const g = gradients[id % gradients.length]
  const d = directions[id % directions.length]
  const t = textColors[id % textColors.length]

  return `${t} ${d} ${g[0]} ${g[1]}`
}

const gradients = [
  // 冷色 + 暖色
  ['from-cyan-500', 'to-amber-400'],
  ['from-teal-500', 'to-rose-400'],
  ['from-indigo-500', 'to-yellow-400'],
  ['from-violet-500', 'to-orange-400'],
  // 自然色 + 跳色
  ['from-emerald-500', 'to-fuchsia-400'],
  ['from-lime-500', 'to-purple-400'],
  ['from-sky-500', 'to-red-400'],
  // 高对比活力组合
  ['from-pink-500', 'to-lime-400'],
  ['from-red-500', 'to-teal-400'],
  ['from-yellow-500', 'to-blue-400'],
  ['from-green-500', 'to-rose-400'],
  // 灰阶 + 鲜明色彩
  ['from-slate-500', 'to-yellow-400'],
  ['from-zinc-500', 'to-pink-400'],
  ['from-stone-500', 'to-cyan-400'],
  // 新增暖色系
  ['from-rose-500', 'to-red-400'],
  ['from-amber-500', 'to-yellow-400'],
  ['from-orange-500', 'to-amber-400'],
  ['from-fuchsia-500', 'to-pink-400'],
  // 新增冷色系
  ['from-cyan-500', 'to-blue-400'],
  ['from-teal-500', 'to-green-400'],
  ['from-indigo-500', 'to-purple-400'],
  ['from-violet-500', 'to-fuchsia-400'],
  // 新增自然色系
  ['from-emerald-500', 'to-teal-400'],
  ['from-lime-500', 'to-green-400'],
  ['from-sky-500', 'to-blue-400'],
  // 新增活力色系
  ['from-pink-500', 'to-purple-500'],
  ['from-red-500', 'to-orange-500'],
  ['from-yellow-500', 'to-red-500'],
  ['from-green-500', 'to-blue-500'],
  // 新增高级灰阶
  ['from-slate-500', 'to-gray-400'],
  ['from-zinc-500', 'to-neutral-400'],
  ['from-stone-500', 'to-zinc-400'],
]

const directions = [
  'bg-gradient-to-br',
  'bg-gradient-to-tr',
  'bg-gradient-to-bl',
  'bg-gradient-to-tl',
  'bg-gradient-to-r',
  'bg-gradient-to-l',
]

const textColors = [
  // Zinc 系列 (100-200)
  'text-zinc-100',
  'text-zinc-200',
  // Gray 系列 (100-200)
  'text-gray-100',
  'text-gray-200',
  // Slate 系列 (100-200)
  'text-slate-100',
  'text-slate-200',
  // Stone 系列 (100-200)
  'text-stone-100',
  'text-stone-200',
  // Neutral 系列 (100-200)
  'text-neutral-100',
  'text-neutral-200',
  // 暖色系浅色 (100-200)
  'text-amber-100',
  'text-amber-200',
  'text-orange-100',
  'text-orange-200',
  'text-rose-100',
  'text-rose-200',
  // 冷色系浅色 (100-200)
  'text-blue-100',
  'text-blue-200',
  'text-cyan-100',
  'text-cyan-200',
  'text-indigo-100',
  'text-indigo-200',
  // 自然色系浅色 (100-200)
  'text-green-100',
  'text-green-200',
  'text-emerald-100',
  'text-emerald-200',
  'text-teal-100',
  'text-teal-200',
]
