import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import { HomeIcon, TwitterLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Navbar } from '@/components/navbar'
import type { NavigationItems } from '@/types'
import './globals.css'

const staticMenuItems: NavigationItems = [
  [
    {
      icon: <HomeIcon />,
      text: '主页',
      href: '/',
      external: false,
    },
    // {
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
    //       <path d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM0 416a64 64 0 1 1 128 0A64 64 0 1 1 0 416zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
    //     </svg>
    //   ),
    //   text: 'RSS',
    //   href: 'https://feeds.feedburner.com/suwako/blog',
    // },
  ],
  [
    {
      icon: <TwitterLogoIcon />,
      text: 'Twitter',
      href: 'https://twitter.com/suwakopro',
      external: true,
    },
    {
      icon: <GitHubLogoIcon />,
      text: 'GitHub',
      href: 'https://github.com/shuowpro',
      external: true,
    },
  ],
]
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="zh" className="dark antialiased transition ease-in-out duration-300">
    <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#0c0e10" />
    </head>
    <body className="bg-black">
      <NextTopLoader />
      <Navbar menu={staticMenuItems} />
      {/* <NextSeo /> */}
      {children}
      <Analytics />
    </body>
  </html>
)

export default RootLayout
