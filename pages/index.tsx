import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts, getOpenGraphImage } from '../lib/api'
import type { Post } from '../lib/types'
import { clean } from '../lib/utils'
import { Tiles } from '../components/Tile'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { NextSeo } from 'next-seo'

export async function getStaticProps() {
  const posts = await getBlogPosts()
  if (!posts) return {}
  return {
    props: {
      posts: clean(posts),
    },
    revalidate: 600,
  }
}

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <>
      <NextSeo
        title="色彩科学"
        openGraph={{
          images: [getOpenGraphImage('Timo Lins')],
        }}
      />
      <Tiles posts={posts} />
      <Footer />
    </>
  )
}

export default HomePage
