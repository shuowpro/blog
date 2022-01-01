import Link from 'next/link';
import Head from 'next/head';
import Layout from '~/components/Layout';
import Article from '~/components/Article';
import Title from '~/components/Title';
import { getAllDocs, getDocBySlug } from '~/lib/docs';
import markdownToHtml from '~/lib/markdown';
import truncate from 'truncate-html';

export default function Index({ docs }) {
  return (
    <>
      {/* <Head>
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
      </Head> */}
      <div className="divide-y divide-stone-300">
        {docs.map((doc) => (
          <Link href={`/${doc.slug}`} key={doc.slug}>
            <section className="h-auto max-w-4xl mx-auto cursor-pointer">
              <Title meta={doc.meta} className="mt-16" />

              <Article
                content={doc.content}
                className="prose-sm leading-tight max-w-none"
              />
            </section>
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const docs = getAllDocs();
  const res = [];
  for (const doc of docs) {
    try {
      doc.content = await markdownToHtml(doc.content || '');
      doc.content = truncate(doc.content, 50, { byWords: true });
      res.push(doc);
    } catch (err) {
      console.error(`Cannot convert ${doc.meta.title}`);
    }
  }

  return {
    props: {
      docs: res
    }
  };
}
