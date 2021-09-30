import React, { FC } from 'react'
import Link from 'next/link'

export const Nav: FC = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-800">
      <ul className="my-4 container">
        <li>
          <Link href="/">
            <a className="text-2xl font-bold text-gray-200">色彩科学</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
