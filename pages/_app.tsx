import { AppProps } from 'next/app'
import Head from 'next/head'

import 'react-notion/src/styles.css'
// import 'prismjs/themes/prism-tomorrow.css'
import '../styles/globals.css'
import '../styles/notion.css'
import '../styles/prism.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
