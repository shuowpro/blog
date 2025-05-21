import { defineCollection } from 'astro:content'
import rehypeShiki from '@shikijs/rehype'
import { notionLoader } from '@chlorinec-pkgs/notion-astro-loader'
import { visit } from 'unist-util-visit'
import type { Node } from 'unist'

// 创建自定义rehype插件，用于将表格包装在可滚动div中
function rehypeWrapTables() {
  return (tree: Node) => {
    visit(
      tree,
      { tagName: 'table' },
      (node: any, index: number, parent: any) => {
        // 创建包装div节点
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrapper'] },
          children: [node],
        }

        // 替换原始表格节点
        parent.children[index] = wrapper
      }
    )
  }
}

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
    rehypePlugins: [
      [rehypeShiki, { theme: 'github-dark-high-contrast' }],
      rehypeWrapTables,
    ],
    experimentalCacheImageInData: true,
    experimentalRootSourceAlias: '/src',
  }),
})

export const collections = { blog }
