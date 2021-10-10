import { getBlogPostMeta, getOpenGraphImage } from '../lib/api'
import type { PostMeta } from '../lib/types'
import { clean } from '../lib/utils'
import { PostLinks } from '../components/PostLink'
import { NextSeo } from 'next-seo'

export async function getStaticProps() {
  const metas = await getBlogPostMeta()
  return {
    props: {
      metas: clean(metas),
    },
    revalidate: 600,
  }
}

function HomePage({ metas }: { metas: PostMeta[] }) {
  if (!metas) return null
  return (
    <>
      <NextSeo
        title="色彩科学"
        openGraph={{
          images: [getOpenGraphImage('Timo Lins')],
        }}
      />
      <main className="post-container my-6 flex-1">
        <PostLinks posts={metas} />
      </main>
    </>
  )
}

export default HomePage
