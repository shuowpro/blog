export interface RawFrontMatter {
  banner_alt?: string
  banner_show?: boolean
  banner?: string
  banner_x?: string
  banner_y?: string
  date: string
  description_show?: boolean
  description?: string
  title_prefix?: string
  title: string
}

export interface FrontMatter extends Omit<RawFrontMatter, 'banner_x' | 'banner_y'> {
  // encoded, trim .md extension name
  slug: string
  // raw file name, not encoded, with .md extension
  fileName: string
  // banner position
  banner_position: string
}

export interface Post {
  frontMatter: FrontMatter
  source: string
}
