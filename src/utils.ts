import type { BlogEntry } from './types'
export function getPublishDate(post: BlogEntry): Date | null {
  const dateString = post.data.properties.发布日期.date?.start
  if (!dateString) return null
  return new Date(dateString)
}

export function estimateReadingTime(
  post: BlogEntry,
  wordsPerMinute: number = 300
): number {
  const htmlContent = post.body || post.rendered?.html || ''

  const textContent = htmlContent
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;]+;/g, ' ')

  const chineseCharCount = (textContent.match(/[\u4e00-\u9fa5]/g) || []).length

  const otherWords = textContent
    .replace(/[\u4e00-\u9fa5]/g, '')
    .split(/\s+/)
    .filter(Boolean).length

  const totalWordCount = chineseCharCount + otherWords

  const minutes = Math.ceil(totalWordCount / wordsPerMinute)

  return Math.max(1, minutes) // 确保最小阅读时间为1分钟
}

export function getPostTitle(post: BlogEntry): string | null {
  return post.data.properties.标题.title[0]?.plain_text
}

export function formatDate(date: Date | null, ignoreYear = false): string {
  if (!date) return ''
  let formatted = `${date.getMonth() + 1}月${date.getDate()}日`
  if (!ignoreYear) {
    formatted = `${date.getFullYear()}年${formatted}`
  }
  return formatted
}

export function getCoverImageUrl(post: BlogEntry): string | null {
  const cover = post.data.cover
  if (!cover) return null
  if (cover.type === 'external') {
    return cover.external.url
  } else {
    return cover.file.url
  }
}
