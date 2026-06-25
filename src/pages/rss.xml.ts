import rss from "@astrojs/rss";
import { GetVisiblePosts } from "../utils/content";

export async function GET(context: { site: string }) {
  const posts = await GetVisiblePosts();
  return rss({
    title: "a",
    description: "a",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.published,
    })),
  });
}
