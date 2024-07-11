import { z, defineCollection } from 'astro:content'

function convertBannerAxis(bannerAxis: number | undefined | null) {
  if (!bannerAxis) return 'center'

  return `${Math.floor(bannerAxis * 100)}%`
}

const BlogPosts = defineCollection({
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        excerpt: z.string().optional(),
        category: z.string().trim(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
        banner: image(),
        banner_x: z.number().optional(),
        banner_y: z.number().optional(),
        date: z.string().transform((str) => new Date(str)),
      })
      .transform((data) => ({
        ...data,
        banner_position: `${convertBannerAxis(
          data.banner_x
        )} ${convertBannerAxis(data.banner_y)}`,
      })),
})

export const collections = {
  blog: BlogPosts,
}
