import Image from 'next/image'
import Link from 'next/link'
import type { FrontMatter } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatRawDate } from '@/lib'
import { cn } from '@/lib/utils'

export const PostCard = ({ frontMatter, index }: { frontMatter: FrontMatter; index: number }) => {
  const href = `/blog/${frontMatter.slug}`
  const latestPost = index === 0
  return (
    <Link
      href={href}
      className={cn(
        'h-96 flex flex-col bg-opacity-75 backdrop-filter backdrop-blur-sm border-2 rounded-2xl overflow-hidden cursor-pointer transform transition ease-in-out duration-300 hover:ring-4 ring-primary',
        latestPost && 'lg:flex-row w-full col-span-full',
      )}>
      {frontMatter.banner && (
        <div
          className={cn(
            'relative flex justify-center w-full my-auto overflow-hidden',
            latestPost && 'h-full lg:max-w-xl',
          )}>
          <div
            className={cn(
              'w-full h-48 bg-gray-600 motion-safe:animate-pulse',
              latestPost && 'h-full',
            )}
          />
          <Image
            alt={frontMatter.title}
            draggable={false}
            layout="fill"
            loading="lazy"
            src={frontMatter.banner}
            objectPosition={frontMatter.banner_position}
            className="absolute top-0 left-0 w-full h-48 object-cover select-none"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between p-6 bg-transparent lg:rounded-tr-none lg:rounded-tl-none">
        <div className="flex flex-col flex-1 justify-around rounded-lg">
          <p className={cn('text-xl font-bold', latestPost && 'lg:text-5xl lg:font-extrabold')}>
            {frontMatter.title}
          </p>
          {((frontMatter.description && frontMatter.description_show) || true) && (
            <p
              className={cn(
                'mt-3 text-base line-clamp-2 text-muted-foreground',
                latestPost && 'lg:text-lg',
              )}
              aria-label={frontMatter.description}>
              {frontMatter.description}
            </p>
          )}
          <div className="flex items-start space-x-1 mt-4 text-sm">
            <Badge>{formatRawDate(frontMatter.date)}</Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
