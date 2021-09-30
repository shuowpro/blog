import { AppProps } from 'next/app'
import Head from 'next/head'
import { Nav } from '../components/Nav'
import '../styles/globals.css'
import '../styles/prism.css'
import 'react-notion/src/styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}
