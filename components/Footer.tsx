import React, { FC } from 'react'
import { BLOG_NAME } from '../site.config'
export const Footer: FC = () => {
  return (
    <div className="text-center text-gray-600 text-sm p-4 mt-8">
      © {new Date().getFullYear()} {BLOG_NAME} ·{' '}
    </div>
  )
}
