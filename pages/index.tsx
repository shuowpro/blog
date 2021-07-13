import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '../lib/api'
import { Post } from '../lib/types'
import Header from '../components/Header'
import { clean } from '../lib/utils'
import { AppContext } from 'next/app'

// export async function getStaticProps() {
//   const posts = await getBlogPosts()
//   if (!posts) return {}
//   return {
//     props: {
//       posts: clean(posts),
//     },
//   }
// }

function HomePage(props: any) {
  return <div></div>
}

// function HomePage({ posts }: { posts: Post[] }) {
//   console.log(posts)
//   return (
//     <>
//       <Header />
//       {/* <main className="content">
//         {posts
//           .filter((post) => post.pageCover)
//           .map((post) => (
//             <Link
//               href={{
//                 pathname: '/post/[slug]',
//                 query: { slug: encodeURIComponent(post.title) },
//               }}
//               key={post.id}
//             >
//               <a className="list-item">
//                 <div className="item-image">
//                   <Image
//                     src={post.pageCover!}
//                     alt="Page Cover"
//                     layout="fill"
//                     objectFit="cover"
//                     quality={100}
//                   />
//                 </div>
//                 <div className="item-text">
//                   <div className="text-title">{post.title}</div>
//                   <div className="text-desc">{post.description}</div>
//                 </div>
//               </a>
//             </Link>
//           ))}
//       </main>
//       <style jsx global>{`
//         html,
//         body {
//           padding: 0;
//           margin: 0;
//         }
//         html {
//           overflow: hidden;
//         }
//         body {
//           width: 100vw;
//           height: 100vh;
//           perspective: 100px;
//           transform-style: preserve-3d;
//           overflow-y: auto;
//           overflow-x: hidden;
//           -webkit-overflow-scrolling: touch;
//         }
//       `}</style>
//       <style jsx>
//         {`
//           .content {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//           }

//           .list-item {
//             position: relative;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             width: 100%;
//             height: 45vh;
//             overflow: hidden;
//           }

//           .item-image {
//             position: absolute;
//             width: 100%;
//             height: 100%;
//             z-index: -1;
//             transform: translateZ(-50px) scale(2.4);
//           }

//           .item-image::before {
//             content: '';
//             display: block;
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 100%;
//             height: 100%;
//             background-color: rgba(0, 0, 0, 0.4);
//             transition: all 0.3s ease;
//             z-index: 10;
//           }

//           .list-item:hover .item-image::before {
//             background-color: rgba(0, 0, 0, 0.2);
//           }

//           .item-text {
//             color: #ffffff;
//             text-align: center;
//           }

//           .text-title {
//             font-size: 2rem;
//             font-weight: bolder;
//             margin-bottom: 20px;
//           }

//           .text-desc {
//             font-size: 1.2rem;
//           }
//         `}
//       </style> */}
//     </>
//   )
// }

// HomePage.getInitialProps = async (ctx: AppContext) => {
//   const posts = await getBlogPosts()
//   if (!posts) return {}
//   return {
//     props: {
//       posts: clean(posts),
//     },
//   }
// }

export async function getServerSideProps(context: AppContext) {
  const posts = await getBlogPosts()
  if (!posts) return {}
  return {
    props: {
      posts: clean(posts),
    },
  }
}

export default HomePage
