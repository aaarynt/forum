export type FriendMessage = {
  id: number
  from: 'me' | 'friend'
  text: string
  time: string
}

export type FriendChat = {
  id: number
  name: string
  status: string
  avatarId: number
  messages: FriendMessage[]
}

export const friendChats: FriendChat[] = [
  {
    id: 1,
    name: '李华',
    status: '在线',
    avatarId: 11,
    messages: [
      { id: 1, from: 'friend', text: '今晚想去刷街吗？', time: '19:10' },
      { id: 2, from: 'me', text: '可以，几点集合？', time: '19:12' },
      { id: 3, from: 'friend', text: '八点半老地方，带头灯。', time: '19:13' },
      { id: 4, from: 'me', text: 'OK，到！', time: '19:14' },
      { id: 5, from: 'friend', text: '我刚换了一套新轮子，今晚试试手感。', time: '19:18' },
      { id: 6, from: 'me', text: '什么硬度？我最近也在看轮子。', time: '19:20' },
      { id: 7, from: 'friend', text: '92A，刷街够用，做动作也不滑。', time: '19:21' },
      { id: 8, from: 'me', text: '那不错，我到时候踩两脚试试。', time: '19:23' },
      { id: 9, from: 'friend', text: '没问题，对了，小胖也去。', time: '19:25' },
      { id: 10, from: 'me', text: '那今晚人齐了，好久没一起滑了。', time: '19:27' },
    ],
  },
  {
    id: 2,
    name: '甬漂的滑手',
    status: '忙碌',
    avatarId: 24,
    messages: [
      { id: 1, from: 'friend', text: '你那块板面宽度多少？', time: '昨天 21:05' },
      { id: 2, from: 'me', text: '8.25，刷街挺稳的。', time: '昨天 21:06' },
      { id: 3, from: 'friend', text: '想试试宽一点的，回头借我踩踩。', time: '昨天 21:07' },
      { id: 4, from: 'me', text: '没问题，周末带给你。', time: '昨天 21:09' },
      { id: 5, from: 'friend', text: '你最近还在练尖翻吗？', time: '昨天 21:12' },
      { id: 6, from: 'me', text: '在练，成功率还不高，十次能成两三次吧。', time: '昨天 21:14' },
      { id: 7, from: 'friend', text: '我最近在练背身翻板，摔了好几次。', time: '昨天 21:16' },
      { id: 8, from: 'me', text: '那个更难，重心要完全压后脚。', time: '昨天 21:18' },
      { id: 9, from: 'friend', text: '对，我每次都是前脚落不稳。', time: '昨天 21:19' },
      { id: 10, from: 'me', text: '下次一起练，互相录视频分析一下。', time: '昨天 21:22' },
    ],
  },
  {
    id: 3,
    name: '阿强',
    status: '离线',
    avatarId: 37,
    messages: [
      { id: 1, from: 'friend', text: '你看了那个kickflip教学吗？', time: '周二 18:40' },
      { id: 2, from: 'me', text: '看了，关键是前脚要往外拨。', time: '周二 18:42' },
      { id: 3, from: 'friend', text: '我老是踢不起来，太难了。', time: '周二 18:45' },
      { id: 4, from: 'me', text: '先练ollie，稳定了再练。', time: '周二 18:47' },
      { id: 5, from: 'friend', text: '我ollie现在能过两立了，够不够？', time: '周二 18:50' },
      { id: 6, from: 'me', text: '那够了，你踢的时候脚踝要放松一点。', time: '周二 18:52' },
      { id: 7, from: 'friend', text: '行，我周末再试试。对了，你桥多高？', time: '周二 18:55' },
      { id: 8, from: 'me', text: '中桥，52mm，刷街做动作都还行。', time: '周二 18:57' },
      { id: 9, from: 'friend', text: '我准备换一对独立桥，听说反馈很好。', time: '周二 19:00' },
      { id: 10, from: 'me', text: '独立桥确实稳，就是有点重。', time: '周二 19:03' },
    ],
  },
  {
    id: 4,
    name: '约拍的妹子',
    status: '在线',
    avatarId: 58,
    messages: [
      { id: 1, from: 'friend', text: '这周末要不要拍点素材？', time: '今天 10:02' },
      { id: 2, from: 'me', text: '可以，我下午有空。', time: '今天 10:05' },
      { id: 3, from: 'friend', text: '那我们两点半公园见。', time: '今天 10:07' },
      { id: 4, from: 'me', text: '行，我带相机。', time: '今天 10:08' },
      { id: 5, from: 'friend', text: '你带鱼眼还是长焦？', time: '今天 10:10' },
      { id: 6, from: 'me', text: '都带上吧，鱼眼拍动作，长焦拍环境。', time: '今天 10:12' },
      { id: 7, from: 'friend', text: '好，我穿那件新卫衣，颜色亮一点。', time: '今天 10:14' },
      { id: 8, from: 'me', text: '可以，我穿黑色，不会抢镜。', time: '今天 10:15' },
      { id: 9, from: 'friend', text: '哈哈，你一直都挺会配合的。', time: '今天 10:17' },
      { id: 10, from: 'me', text: '毕竟专业工具人。', time: '今天 10:18' },
    ],
  },
  {
    id: 5,
    name: '板店老板阿Ken',
    status: '在线',
    avatarId: 42,
    messages: [
      { id: 1, from: 'friend', text: '兄弟，新款轴承到了，要不要来看看？', time: '昨天 14:23' },
      { id: 2, from: 'me', text: '什么牌子？价格怎么样？', time: '昨天 14:25' },
      { id: 3, from: 'friend', text: 'Bones Swiss，限量款，给你留了一套。', time: '昨天 14:26' },
      { id: 4, from: 'me', text: '这个有点贵啊，我先攒攒钱。', time: '昨天 14:28' },
      {
        id: 5,
        from: 'friend',
        text: '行，我先帮你留着。对了，下周六店里办比赛，你来吗？',
        time: '昨天 14:30',
      },
      { id: 6, from: 'me', text: '什么比赛？奖品有啥？', time: '昨天 14:32' },
      { id: 7, from: 'friend', text: 'best trick，冠军送一套轮子加板面。', time: '昨天 14:33' },
      { id: 8, from: 'me', text: '那我得练练大招了，报名费多少？', time: '昨天 14:35' },
      { id: 9, from: 'friend', text: '50块，含饮料和纪念贴纸。', time: '昨天 14:36' },
      { id: 10, from: 'me', text: '行，帮我报一个。', time: '昨天 14:38' },
    ],
  },
  {
    id: 6,
    name: '小胖',
    status: '离开',
    avatarId: 19,
    messages: [
      { id: 1, from: 'friend', text: '我最近胖了十斤，ollie都跳不起来了。', time: '周三 16:12' },
      { id: 2, from: 'me', text: '哈哈，你天天喝奶茶能不胖吗？', time: '周三 16:14' },
      { id: 3, from: 'friend', text: '戒不掉啊，滑完就想喝冰的。', time: '周三 16:15' },
      { id: 4, from: 'me', text: '喝无糖的，或者带电解质的水。', time: '周三 16:17' },
      { id: 5, from: 'friend', text: '难受，你今天去滑吗？', time: '周三 16:18' },
      { id: 6, from: 'me', text: '去，六点左右到广场。', time: '周三 16:19' },
      { id: 7, from: 'friend', text: '我也去，顺便减减肥。', time: '周三 16:20' },
      { id: 8, from: 'me', text: '行，带上护具，你最近总摔。', time: '周三 16:22' },
      { id: 9, from: 'friend', text: '知道了知道了，晚上见。', time: '周三 16:23' },
      { id: 10, from: 'me', text: '晚上见，别迟到。', time: '周三 16:24' },
    ],
  },
  {
    id: 7,
    name: '摄影师阿杰',
    status: '离线',
    avatarId: 63,
    messages: [
      { id: 1, from: 'friend', text: '上次拍的素材我剪好了，你要不要看看？', time: '周一 20:05' },
      { id: 2, from: 'me', text: '发我看看，剪得怎么样？', time: '周一 20:07' },
      { id: 3, from: 'friend', text: '加了慢动作和转场，配了个后摇的bgm。', time: '周一 20:09' },
      { id: 4, from: 'me', text: '看完了，拍得真不错，尤其是那个大乱的角度。', time: '周一 20:15' },
      { id: 5, from: 'friend', text: '那个角度我蹲了好久才抓到。', time: '周一 20:16' },
      { id: 6, from: 'me', text: '辛苦你了，下次请你喝东西。', time: '周一 20:18' },
      {
        id: 7,
        from: 'friend',
        text: '客气啥，对了，你认识其他滑手吗？我想多拍点素材。',
        time: '周一 20:20',
      },
      { id: 8, from: 'me', text: '认识好几个，周末我约他们出来。', time: '周一 20:22' },
      { id: 9, from: 'friend', text: '太好了，到时候多拍点。', time: '周一 20:23' },
      { id: 10, from: 'me', text: '没问题，我拉个群。', time: '周一 20:25' },
    ],
  },
  {
    id: 8,
    name: '老陈（鞋贩子）',
    status: '在线',
    avatarId: 85,
    messages: [
      { id: 1, from: 'friend', text: '兄弟，新到的Dunk SB，你要不要看看？', time: '今天 09:15' },
      { id: 2, from: 'me', text: '什么配色？价格别太离谱。', time: '今天 09:17' },
      { id: 3, from: 'friend', text: '黑紫配色的，滑板款，耐磨底。', time: '今天 09:18' },
      { id: 4, from: 'me', text: '多少？我鞋快磨穿了正想换。', time: '今天 09:20' },
      { id: 5, from: 'friend', text: '给你700，别人我都卖800。', time: '今天 09:21' },
      { id: 6, from: 'me', text: '有点贵啊，能便宜点不？', time: '今天 09:22' },
      { id: 7, from: 'friend', text: '650最低了，真没赚你钱。', time: '今天 09:23' },
      { id: 8, from: 'me', text: '行吧，帮我留一双42码的。', time: '今天 09:25' },
      { id: 9, from: 'friend', text: '好，晚上来店里拿。', time: '今天 09:26' },
      { id: 10, from: 'me', text: 'OK，晚上见。', time: '今天 09:27' },
    ],
  },
]
