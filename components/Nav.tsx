import React, { FC } from 'react'
import Link from 'next/link'

export const Nav: FC = () => {
  return (
    <nav className="flex justify-between items-center my-4 container">
      <Link href="/">
        <a className="text-2xl font-bold">色彩科学</a>
      </Link>
      {/* <ul className="flex">
        <li>
          <Link href="/projects">
            <a className="text-blue-700 mr-2 px-2 py-1 rounded-md">项目</a>
          </Link>
        </li>
      </ul> */}
    </nav>
  )
}
