import { defineCollection } from 'astro:content'
import { notionLoader } from '@chlorinec-pkgs/notion-astro-loader'

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
