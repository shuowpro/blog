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
  }
}

function HomePage({ posts }: { posts: Post[] }) {
  console.log(posts)
  return (
    <>
      <NextSeo
        openGraph={{
          images: [getOpenGraphImage('Timo Lins')],
        }}
      />
      <Nav />
      <Tiles posts={posts} />
      <Footer />
    </>
  )
}

export default HomePage
