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
  return `https://www.notion.so/image/${encodeURIComponent(
    image
  )}?table=block&id=${id}&cache=v2`
}

export const isProd = process.env.NODE_ENV === 'production'
// export const isProd = true

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
