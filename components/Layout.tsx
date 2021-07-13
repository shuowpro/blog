import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import useThrottle from '@rooks/use-throttle'
import React, { useEffect, useRef } from 'react'
import type { Post } from '../lib/types'
import Image from 'next/image'
import placeholder from '../public/placeholder.jpg'

export interface PageItemProps {
  post: Post
  offset: number
  onClick: () => void
}

const PageItem = ({ post, offset, onClick }: PageItemProps) => {
  return (
    <>
      <ParallaxLayer offset={offset} onClick={onClick}>
        {post.pageCover ? (
          <Image
            src={post.pageCover!}
            alt="page Cover"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Image src={placeholder} layout="fill" />
        )}

        {/* <img
          className="w-screen h-screen object-cover"
          src={post.pageCover}
          alt="Page Cover"
        /> */}
      </ParallaxLayer>
      <ParallaxLayer offset={offset} onClick={onClick} speed={0.3}>
        <div className="text-white text-5xl absolute left-0 top-0">
          {post.title}
        </div>
      </ParallaxLayer>
    </>
  )
}

export interface LayoutProps {
  posts: Post[]
}

const Layout = ({ posts }: LayoutProps) => {
  const parallax = useRef<any>(null)
  const total = posts.length
  const handleWheel = (e: any) => {
    e.preventDefault()
    console.log('handleWheel', parallax)
    const offset = parallax.current.offset
    if (e.deltaY < 0 && offset > 0) {
      parallax.current.scrollTo(offset - 1)
    } else if (e.deltaY > 0 && offset < total - 1) {
      parallax.current.scrollTo(offset + 1)
    }
  }
  const [handleWheelThrottled] = useThrottle(handleWheel, 1000)
  useEffect(() => {
    window.addEventListener('wheel', handleWheelThrottled, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheelThrottled)
    }
  })
  return (
    <div>
      <Parallax pages={total} ref={parallax} id="parallax">
        {posts.map((post, index) => (
          <PageItem
            key={post.id}
            post={post}
            offset={index}
            onClick={() => {
              console.log('clicked')
            }}
          />
        ))}
      </Parallax>
      <style jsx global>
        {`
          @media (hover: hover) {
            body {
              pointer-events: none;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Layout
