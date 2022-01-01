import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import siteMeta from '../site.config';
import Header from './Header';
import cx from 'classnames';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export default function Layout({ children, pathname }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/brands.min.css"
          integrity="sha512-sVSECYdnRMezwuq5uAjKQJEcu2wybeAPjU4VJQ9pCRcCY4pIpIw4YMHIOQ0CypfwHRvdSPbH++dA3O4Hihm/LQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Header />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={pathname}
          classNames="layout-transition"
          timeout={300}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}
