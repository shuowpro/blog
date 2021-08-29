import { BlockMapType, PageValueType } from 'react-notion'
import { MetaDataFromBlock } from './types'

export function getMetaFromBlock(
  block: BlockMapType,
  id: string
): MetaDataFromBlock {
  const pageBlock = block[id]
  const pageBlockValue = pageBlock.value as PageValueType
  return {
    pageCover: formatImagePath(id, pageBlockValue.format.page_cover),
    pageCoverPosition: pageBlockValue.format.page_cover_position,
    pageCoverFullWidth: pageBlockValue.format.page_full_width,
    pageIcon: formatImagePath(id, pageBlockValue.format.page_icon),
    createdTime: pageBlockValue.created_time,
  }
}

export function formatImagePath(
  id: string,
  image?: string
): string | undefined {
  if (!image) return undefined
  if (!image.startsWith('http')) {
    image = 'https://www.notion.so' + image
  }
  const imageUrl = `https://www.notion.so/image/${encodeURIComponent(
    image
  )}?table=block&id=${id}&cache=v2`
  return `https://ssfy.io/${encodeURIComponent(imageUrl.toString())}`
}

// export const isProd = process.env.NODE_ENV === 'production'
export const isProd = false

// hack to remove undefined
export function clean(obj: any) {
  let replacer = function (key: any, value: any) {
    return typeof value === 'undefined' ? null : value
  }
  return JSON.parse(JSON.stringify(obj, replacer))
}

export function hashCode(str: string): number {
  return Array.from(str).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  )
}

export const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

import { MapImageUrl } from 'react-notion'

export const toNotionImageUrl: MapImageUrl = (url, block) => {
  const imageUrl = new URL(
    url.startsWith('https://www.notion.so')
      ? url
      : `https://www.notion.so${
          url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
        }`
  )

  if (block) {
    const table =
      block.value.parent_table === 'space' ? 'block' : block.value.parent_table
    imageUrl.searchParams.set('table', table)
    imageUrl.searchParams.set('id', block.value.id)
    imageUrl.searchParams.set('cache', 'v2')
  }

  return `https://ssfy.io/${encodeURIComponent(imageUrl.toString())}`
}
