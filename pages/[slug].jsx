import Head from 'next/head';
import Article from '~/components/Article';
import Title from '~/components/Title';
import Comment from '~/components/Comment';
import { getAllDocs, getDocBySlug } from '~/lib/docs';
import markdownToHtml from '~/lib/markdown';
import { getReadTime } from '~/lib/utils';
import Gravatar from 'react-gravatar';
import siteMeta from '../site.config';

export default function Doc({ meta, content, readTime }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
      </Head>
      <Title meta={meta} readTime={readTime} className="mt-16" />
      <div className="w-full mx-auto flex justify-center items-center mt-6">
        <Gravatar
          className="cursor-pointer inline-block rounded-full w-24 h-24 outline outline-offset-2 outline-slate-500"
          email={siteMeta.email}
          size={100}
        />
      </div>
      <Article content={content} />
      <Comment />
    </>
  );
}

export async function getStaticProps({ params }) {
  const doc = getDocBySlug(params.slug);
  const readTime = getReadTime(doc.content);
  const content = await markdownToHtml(doc.content || '');

  return {
    props: {
      ...doc,
      content,
      readTime
    }
  };
}

export async function getStaticPaths() {
  const docs = getAllDocs();

  return {
    paths: docs.map((doc) => {
      return {
        params: {
          slug: doc.slug
        }
      };
    }),
    fallback: false
  };
}
