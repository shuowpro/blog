import { Parallax, ParallaxLayer } from './Parallax'
import useThrottle from '@rooks/use-throttle'
import React, { useEffect, useRef, useState } from 'react'
import type { Post } from '../lib/types'
import Image from 'next/image'
import placeholder from '../public/placeholder.jpg'
import { useScroll } from 'react-use-gesture'

export interface PageItemProps {
  post: Post
  offset: number
  onScollClick: () => void
  onOpenClick: () => void
  open: boolean
  homepage: boolean
}

const PageItem = ({
  post,
  offset,
  onScollClick,
  open,
  onOpenClick,
  homepage,
}: PageItemProps) => {
  console.log('offset:', offset, 'homepage', homepage, 'open', open)
  return (
    <>
      {(homepage || open) && (
        <ParallaxLayer offset={offset} onClick={onScollClick}>
          {post.pageCover ? (
            <div>
              <Image
                src={post.pageCover!}
                alt="page Cover"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute h-full w-full bg-black bg-opacity-20"></div>
            </div>
          ) : (
            <Image src={placeholder} layout="fill" />
          )}
        </ParallaxLayer>
      )}
      {homepage && (
        <>
          <ParallaxLayer offset={offset} onClick={onScollClick}>
            <div className="slope1 absolute w-full h-full bg-black bg-opacity-60 backdrop-filter backdrop-blur-xl"></div>
          </ParallaxLayer>
          {/* <ParallaxLayer offset={offset} onClick={onClick} speed={0.6}>
            <div className="slope2 absolute w-full h-full bg-black bg-opacity-40 backdrop-filter backdrop-blur-xl"></div>
          </ParallaxLayer> */}
          <ParallaxLayer offset={offset} speed={0.3} onClick={onOpenClick}>
            <div className="bg-yellow-400 bg-opacity-60 w-max h-max p-4 absolute right-1/3 bottom-1/4 cursor-pointer">
              <div className="text-white text-5xl relative mb-3">
                {post.title}
              </div>
              <div className="text-white text-xl relative">
                {post.description}
              </div>
            </div>
          </ParallaxLayer>
        </>
      )}
      <style jsx>{`
        .slope1 {
          clip-path: polygon(78% 0, 100% 0%, 100% 100%, 47% 100%);
        }
        .slope2 {
          clip-path: polygon(0 84%, 100% 54%, 100% 100%, 0% 100%);
        }
      `}</style>
    </>
  )
}

export interface LayoutProps {
  posts: Post[]
}

const Layout = ({ posts }: LayoutProps) => {
  const parallax = useRef<any>(null)
  const [scrollContainer, setScrollContainer] = useState<any>(null)
  const total = posts.length

  const bind = useScroll()
  // const handleWheel = (e: any) => {
  //   e.preventDefault()
  //   console.log('handleWheel', parallax)
  //   const offset = parallax.current.offset
  //   if (e.deltaY < 0 && offset > 0) {
  //     parallax.current.scrollTo(offset - 1)
  //   } else if (e.deltaY > 0 && offset < total - 1) {
  //     parallax.current.scrollTo(offset + 1)
  //   }
  // }
  // const [handleWheelThrottled] = useThrottle(handleWheel, 1000)
  // useEffect(() => {
  //   window.addEventListener('wheel', handleWheelThrottled, { passive: false })
  //   return () => {
  //     window.removeEventListener('wheel', handleWheelThrottled)
  //   }
  // }, [])

  useEffect(() => {
    window.addEventListener('wheel', () => console.log(parallax), {
      passive: false,
    })
    return () => {}
  }, [])
  return (
    <div>
      <Parallax pages={total} ref={parallax}>
        {posts.map((post, index) => (
          <PageItem
            key={post.id}
            post={post}
            offset={index}
            onScollClick={() => {
              // console.log('clicked')
              // parallax.current.scrollTo((index + 1) % total)
              parallax.current.scrollTo(index)
            }}
            homepage={openIndex < 0}
            open={openIndex === index}
            onOpenClick={() => {
              // setOpenIndex(index)
            }}
          />
        ))}
      </Parallax>
      {/* <style jsx global>
        {`
          @media (hover: hover) {
            body {
              pointer-events: none;
            }
          }
        `}
      </style> */}
    </div>
  )
}

export default Layout
