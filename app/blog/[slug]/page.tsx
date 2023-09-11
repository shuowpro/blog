import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { formatRawDate } from '@/lib/time'
import { getPostBySlug } from '@/lib/post'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

async function getPost(slug: string) {
  const decodedSlug = decodeURIComponent(slug)
  return await getPostBySlug(decodedSlug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontMatter } = await getPost(params.slug)

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      images: frontMatter.banner,
    },
  }
}

const Page = async ({ params }: Props) => {
  const { frontMatter, source } = await getPost(params.slug)
  return (
    <div className="mt-24 flex flex-col space-y-4 max-w-4xl mx-auto my-4 px-2">
      <div className="flex flex-col space-y-4 mx-auto my-4 text-lg text-center">
        {frontMatter.title_prefix && (
          <span className="block font-semibold tracking-wide uppercase text-base">
            {frontMatter.title_prefix}
          </span>
        )}
        <span className="block sm:text-4xl text-3xl leading-8 font-extrabold tracking-tight my-2">
          {frontMatter.title}
        </span>
        <span className="flex justify-center items-center">
          <Avatar className="justify-center">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/8056270?v=4"
              alt="@shuowpro"
            />
          </Avatar>
        </span>

        <span className="flex justify-center items-center">
          <Badge>{formatRawDate(frontMatter.date)}</Badge>
        </span>

        {frontMatter.description && frontMatter.description_show && (
          <p className="mt-8 text-xl text-gray-400 leading-8">{frontMatter.description}</p>
        )}
      </div>
      <div>
        {frontMatter.banner && (frontMatter.banner_show ?? true) && (
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={frontMatter.banner_alt ?? frontMatter.title}
              draggable={false}
              fill
              src={frontMatter.banner}
              style={{ objectPosition: frontMatter.banner_position }}
              className="object-cover rounded-3xl shadow-xl"
            />
          </AspectRatio>
        )}
      </div>

      <article className="pt-16 mx-auto prose-primary prose-lg">
        <MDXRemote source={source} options={{ parseFrontmatter: true }} />
      </article>
    </div>
  )
}

export default Page
