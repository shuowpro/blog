import React, { FC } from 'react'
import Link from 'next/link'
import config from '../site.config'

export const Nav: FC = () => {
  return (
    <header className="flex justify-between items-center border-b-2 border-gray-100 dark:border-gray-900">
      <nav className="post-container flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-light text-gray-600 dark:text-gray-200 my-4 ">
            {config.BLOG_NAME}
          </a>
        </Link>

        <ul className="flex justify-between items-center">
          {/* <li className="mr-4">
            <Link href="/about">
              <a className="text-gray-600 font-extralight">RSS</a>
            </Link>
          </li> */}
          <li>
            <Link href="/about">
              <a className="text-gray-600 font-extralight dark:text-gray-200">
                关于
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
