import { BlockMapType } from 'react-notion'

export interface PostMeta {
  id: string
  isPublished: boolean
  tags: [string]
  title: string
}

export interface MetaDataFromBlock {
  pageCover?: string
  pageCoverPosition?: number
  pageCoverFullWidth?: boolean
  pageIcon?: string
  createdTime: number
}

export interface Post extends PostMeta, MetaDataFromBlock {
  block: BlockMapType
}
