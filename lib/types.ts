import { BlockMapType } from 'react-notion'

export interface PostMeta {
  id: string
  isPublished: boolean
  title: string
  createdTime: string
}

export interface MetaDataFromBlock {
  pageCover?: string
  pageCoverPosition?: number
  pageCoverFullWidth?: boolean
  pageIcon?: string
  createdTime: number
}

export interface Post extends PostMeta {
  block: BlockMapType
}
