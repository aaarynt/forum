import type { TComment, TmeProfile } from './types'
import { mockComments } from './commentData'

export const meProfile: TmeProfile = {
  name: '开发者',
  handle: '@dev',
  avatarId: 48,
  located: '南京',
  bio: '滑板是我的长期主义：今天也要比昨天稳一点。',
  joinedAt: '2025-11-03',
}

export const myPosts: TComment[] = [
  {
    id: 1769328001001,
    name: '开发者',
    located: '南京',
    heading: '新手练 ollie 的三个“卡点”，你可能也踩过',
    content:
      '1）起跳时重心在后脚；2）前脚滑板太早导致板头下坠；3）落地时双脚不敢踩实。把动作拆成：蹲—pop—滑—收—落，先保证每一步都稳定，再追求高度。',
    likes: 126,
    comments: 32,
    liked: false,
  },
  {
    id: 1769241601002,
    name: '开发者',
    located: '南京',
    heading: '夜滑清单：护具、灯、轮子怎么配更舒服？',
    content:
      '夜滑最重要的是“看得见”和“停得住”。头灯优先、再配尾灯；刷街推荐软一点的轮子（92a-97a），颠簸少不容易崴脚。护腕一定要戴，摔一次你就懂。',
    likes: 88,
    comments: 19,
    liked: true,
  },
  {
    id: 1769155201003,
    name: '开发者',
    located: '南京',
    heading: '板面宽度 8.0/8.25/8.5：怎么选不纠结',
    content:
      '简单粗暴：鞋大/想稳/台阶多选宽一点；想翻板轻快选窄一点。别怕试错，最省心的办法是先借朋友的板踩一圈再决定。',
    likes: 64,
    comments: 11,
    liked: false,
  },
  {
    id: 1769068801004,
    name: '开发者',
    located: '南京',
    heading: '我最常用的热身动作（5 分钟版本）',
    content:
      '踝关节绕环、深蹲、髋外展、腿后侧拉伸、原地小跳。热身不是为了“拉长”，而是为了让身体进入滑行节奏，减少第一摔。',
    likes: 52,
    comments: 7,
    liked: false,
  },
  {
    id: 1768982401005,
    name: '开发者',
    located: '南京',
    heading: '为什么你总觉得“板子不听话”？可能是你太想控制它',
    content:
      '很多动作失败不是力量不够，而是身体太紧：肩膀僵、手臂乱摆、视线盯着脚。试试把注意力从“脚”移到“重心”和“视线”，会立刻松下来。',
    likes: 71,
    comments: 15,
    liked: false,
  },
  {
    id: 1768896001006,
    name: '开发者',
    located: '南京',
    heading: '练 kickflip 卡半年？你可能忽略了这一个细节',
    content:
      '很多人只练“弹”和“刷”，但忽略了脚的位置。前脚太靠中间，板子只会转不翻。把前脚放到螺丝上方一点，成功率会明显提升。',
    likes: 93,
    comments: 21,
    liked: false,
  },
  {
    id: 1768809601007,
    name: '开发者',
    located: '南京',
    heading: '刷街 vs 技巧：两种路线你更适合哪一个？',
    content:
      '刷街更偏耐力和路线选择，技巧更偏动作控制。新手建议先刷街，建立平衡和速度感，再切技巧，不然很容易挫败。',
    likes: 58,
    comments: 13,
    liked: false,
  },
  {
    id: 1768723201008,
    name: '开发者',
    located: '南京',
    heading: '为什么你越练越紧？一个常见误区',
    content:
      '你在“用力控制”，而不是“顺着惯性走”。滑板是惯性运动，身体越紧越反直觉。建议刻意放松肩膀和手臂。',
    likes: 77,
    comments: 18,
    liked: true,
  },
  {
    id: 1768636801009,
    name: '开发者',
    located: '南京',
    heading: '新手第一块板：整板 vs 自组，怎么选？',
    content:
      '预算有限直接整板，省心。想长期玩建议自组，体验差距明显。桥和轮子的手感，比板面更关键。',
    likes: 112,
    comments: 29,
    liked: true,
  },
  {
    id: 1768550401010,
    name: '开发者',
    located: '南京',
    heading: '练习频率：每天 10 分钟 vs 周末 2 小时',
    content: '短频快更有效。每天10分钟，比周末爆练更容易形成肌肉记忆。',
    likes: 49,
    comments: 9,
    liked: false,
  },
  {
    id: 1768464001011,
    name: '开发者',
    located: '南京',
    heading: '为什么你总在“差一点”？其实你已经会了',
    content:
      '很多人卡在90%，但心理上当成失败。其实已经接近成功，只是缺稳定性。这个阶段最容易放弃。',
    likes: 135,
    comments: 34,
    liked: true,
  },
  {
    id: 1768377601012,
    name: '开发者',
    located: '南京',
    heading: '轮子硬度怎么选？一句话讲清楚',
    content: '硬轮（99a+）适合技巧，软轮（90a-97a）适合刷街。别纠结，按场景选。',
    likes: 61,
    comments: 12,
    liked: false,
  },
  {
    id: 1768291201013,
    name: '开发者',
    located: '南京',
    heading: '摔倒不可避免，但可以“更安全”',
    content: '别用手硬撑，学会侧滚分散冲击。护腕是最低成本的保险。',
    likes: 84,
    comments: 16,
    liked: false,
  },
]

export const likedPosts: TComment[] = mockComments
  .filter((c) => c.liked && c.name !== meProfile.name)
  .slice(0, 8)
  .map((c) => ({ ...c }))
