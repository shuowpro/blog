import Head from 'next/head';
import siteMeta from '../site.config';
import Header from './Header';
import cx from 'classnames';

export default function Article({ content, className }) {
  return (
    <article
      className={cx(
        'prose prose-slate px-4 m-auto my-4 sm:my-16 text-stone-500 prose-headings:text-stone-700 leading-relaxed font-sans',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
