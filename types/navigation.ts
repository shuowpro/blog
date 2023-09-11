import type { ReactNode } from 'react'

export interface NavigationItem {
  icon: string | ReactNode
  text: string
  href: string
  external: boolean
}

export type NavigationItems = Array<Array<NavigationItem>>
