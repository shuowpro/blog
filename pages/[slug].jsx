import Head from 'next/head';
import Article from '~/components/Article';
import Title from '~/components/Title';
import Comment from '~/components/Comment';
import { getAllDocs, getDocBySlug } from '~/lib/docs';
import markdownToHtml from '~/lib/markdown';
import { getReadTime } from '~/lib/utils';

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
