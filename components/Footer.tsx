import React, { FC } from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import config from '../site.config'

export const Footer: FC = () => {
  return (
    <footer className="border-t-2 border-gray-100 my-10 font-light text-sm ">
      <section className="post-container mt-10">
        <h2 className="text-lg font-light text-black dark:text-white">
          {config.BLOG_NAME}
        </h2>
        <div className="mt-4 flex">
          <div className="mr-20">
            <ul>
              <li className="text-gray-400 my-1">邮箱</li>
              <li className="my-1">
                <a href={`mailto:${config.EMAIL_ADDR}`}>{config.EMAIL_ADDR}</a>
              </li>
            </ul>
          </div>
          <div className="mr-20">
            <ul>
              <li className="my-1">
                <a href="https://github.com/leuction">
                  <FaGithub className="inline mr-2 align-baseline opacity-50" />
                  <span>leuction</span>
                </a>
              </li>
              <li className="my-1">
                <a href="https://twitter.com/wsha8">
                  <FaTwitter className="inline mr-2 align-baseline opacity-50" />
                  <span>wsha8</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="my-1">
                © {new Date().getFullYear()} {config.BLOG_NAME} ·{' '}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  )
}
