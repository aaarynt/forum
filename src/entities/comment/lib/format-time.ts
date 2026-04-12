/**
 * 统一格式化时间戳为可读字符串
 * @param timestamp - 时间戳（毫秒）或 ISO 日期字符串
 * @returns 格式化后的时间字符串，如 "4/12 14:30"
 */
export function formatTime(timestamp: number | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp)

  // 检查日期是否有效
  if (Number.isNaN(date.getTime())) {
    return typeof timestamp === 'string' ? timestamp : 'Invalid Date'
  }

  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')

  return `${M}/${D} ${H}:${mm}`
}

/**
 * 格式化日期为完整格式
 * @param timestamp - 时间戳或日期字符串
 * @returns 格式化后的日期字符串，如 "2026年4月12日"
 */
export function formatDate(timestamp: number | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp)

  if (Number.isNaN(date.getTime())) {
    return typeof timestamp === 'string' ? timestamp : 'Invalid Date'
  }

  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()

  return `${Y}年${M}月${D}日`
}

/**
 * 获取相对时间描述
 * @param timestamp - 时间戳或日期字符串
 * @returns 相对时间描述，如 "刚刚", "5分钟前", "2小时前", "昨天" 等
 */
export function getRelativeTime(timestamp: number | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp)

  if (Number.isNaN(date.getTime())) {
    return '未知时间'
  }

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return '刚刚'
  if (diffMin < 60) return `${diffMin}分钟前`
  if (diffHour < 24) return `${diffHour}小时前`
  if (diffDay === 1) return '昨天'
  if (diffDay < 7) return `${diffDay}天前`

  return formatTime(timestamp)
}
