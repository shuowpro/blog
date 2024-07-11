import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format as dateFnsFormat } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { getCollection } from 'astro:content'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function format(date: Date, format: string) {
  return dateFnsFormat(date, format, { locale: zhCN })
}

// Only return posts without `draft: true` in the frontmatter

export const posts = (
  await getCollection('blog', ({ data }) => {
    return data.draft !== true
  })
).sort(
  (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
)
