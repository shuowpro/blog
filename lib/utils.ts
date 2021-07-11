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

// export const isProd = process.env.NODE_ENV === 'production'
export const isProd = true

// Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
// >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUndefined = (obj: Record<string, any> | undefined): void => {
  if (obj) {
    Object.keys(obj).forEach((key: string) => {
      if (obj[key] && typeof obj[key] === 'object') {
        deleteUndefined(obj[key])
      } else if (typeof obj[key] === 'undefined') {
        delete obj[key] // eslint-disable-line no-param-reassign
      }
    })
  }
}
