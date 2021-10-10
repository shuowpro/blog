import { AppProps } from 'next/app'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import 'react-notion/src/styles.css'
import '../styles/prism.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Nav />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={router.pathname}
          classNames="layout-transition"
          timeout={300}
        >
          <Component {...pageProps} />
        </CSSTransition>
      </SwitchTransition>
      <Footer />
    </>
  )
}
