import { defineCollection } from 'astro:content'
import { notionLoader } from '@chlorinec-pkgs/notion-astro-loader'

// 添加调试日志
console.log('Building with environment variables:')
console.log('NOTION_TOKEN exists:', Boolean(import.meta.env.NOTION_TOKEN))
console.log(
  'NOTION_DATABASE_ID exists:',
  Boolean(import.meta.env.NOTION_DATABASE_ID)
)

console.log('env', JSON.stringify(import.meta.env))

const blog = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.NOTION_TOKEN,
    database_id: import.meta.env.NOTION_DATABASE_ID,
    imageSavePath: 'assets/images/notion',
    filter: {
      property: '状态',
      select: {
        equals: '已发布',
      },
    },
  }),
})

export const collections = { blog }
