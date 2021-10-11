import React, { FC } from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import config from '../site.config'

export const Footer: FC = () => {
  return (
    <footer className="border-t-2 border-gray-100 dark:border-gray-900 my-10 font-light">
      <section className="post-container mt-10">
        <h2 className="md:text-lg font-light text-black dark:text-gray-200">
          {config.BLOG_NAME}
        </h2>
        <div className="mt-4 flex flex-col md:flex-row text-xs md:text-base">
          <div className="md:mr-20">
            <ul>
              <li className="text-gray-400 my-1 dark:text-gray-200">邮箱</li>
              <li className="my-1">
                <a href={`mailto:${config.EMAIL_ADDR}`}>{config.EMAIL_ADDR}</a>
              </li>
            </ul>
          </div>
          <div className="md:mr-20">
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
              <li className="my-1 dark:text-gray-200">
                © {new Date().getFullYear()} {config.BLOG_NAME} ·{' '}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  )
}
