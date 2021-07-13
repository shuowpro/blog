import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'
import type { Post } from '../lib/types'
import { getBlogPosts } from '../lib/api'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import '../styles/globals.css'
import '../styles/notion.css'
import '../styles/prism.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log('router', router)
  const posts = pageProps.posts as Post[]
  return (
    <>
      <Layout posts={posts}></Layout>
      <Component {...pageProps} />
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)
//   const posts = await getBlogPosts()
//   console.log('posts', posts)
//   return { ...appProps, posts }
// }

export default MyApp
