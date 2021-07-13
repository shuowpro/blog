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

// hack to remove undefined
export function clean(obj: any) {
  let replacer = function (key: any, value: any) {
    return typeof value === 'undefined' ? null : value
  }
  return JSON.parse(JSON.stringify(obj, replacer))
}

export function throttle(func: Function, timeFrame: number) {
  let lastTime = 0
  return function (...args: any[]) {
    const now = Date.now()
    if (now - lastTime >= timeFrame) {
      func(...args)
      lastTime = now
    }
  }
}
