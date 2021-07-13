import Image from 'next/image'
import { NotionRenderer } from 'react-notion'
import { getBlogPostMeta, getBlogPosts } from '../../lib/api'
import { Post } from '../../lib/types'
import { clean } from '../../lib/utils'
import type { AppContext } from 'next/app'

// export async function getStaticProps({
//   params: { slug },
// }: {
//   params: { slug: string }
// }) {
//   // Get all posts again
//   const posts = await getBlogPosts()
//   if (!posts) return {}

//   // Find the current blogpost by slug
//   const post = posts.find((post) => encodeURIComponent(post.title) === slug)

//   return {
//     props: { post: clean(post) },
//   }
// }

// const BlogPost: React.FC<{ post: Post }> = ({ post }) => {
//   if (!post) return null
//   return (
//     <>
//       {post.pageCover && (
//         <Image
//           width={1000}
//           height={300}
//           src={post.pageCover}
//           quality={100}
//           layout="responsive"
//           objectFit="cover"
//         />
//       )}
//       <article className="container">
//         <h1 className="text-4xl md:text-6xl text-center font-bold my-5 md:my-20">
//           {post.title}
//         </h1>
//         <NotionRenderer blockMap={post.block} />
//       </article>
//     </>
//   )
// }

// export async function getStaticPaths() {
//   const postMetas = await getBlogPostMeta()
//   if (!postMetas) return {}
//   return {
//     paths: postMetas.map(
//       (postMeta) => `/post/${encodeURIComponent(postMeta.title)}`
//     ),
//     fallback: true,
//   }
// }

const BlogPost = (props: any) => {
  console.log(props)
  return <div></div>
}
export async function getServerSideProps(context: AppContext) {
  const posts = await getBlogPosts()
  if (!posts) return {}
  return {
    props: {
      posts: clean(posts),
    },
  }
}

export default BlogPost
