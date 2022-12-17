import matter from 'gray-matter';
import { format } from '~/lib';
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';

import RehypeAutolinkHeadings from 'rehype-autolink-headings';
import RemarkCodeTitles from 'remark-code-titles';
import RemarkEmoji from 'remark-emoji';
import RemarkPrism from 'remark-prism';
import RemarkSlug from 'remark-slug';

import type { FrontMatter, Post, RawFrontMatter } from '~/types';

const BLOG_POSTS_DIR = join(process.cwd(), 'data', 'blog');

/**
 * Convert the banner axis to the format of `x%`
 * @param bannerAxis the banner axis in the frontmatter
 * @returns the banner position in the format of `x%`
 */
function convertBannerAxis(bannerAxis: string | undefined | null) {
	if (!bannerAxis) return 'center';

	return `${Math.floor(parseFloat(bannerAxis) * 100)}%`;
}

/**
 * Get the slugs of all available blog posts
 */
export async function getAllPostFileNames() {
	return readdirSync(BLOG_POSTS_DIR);
}

/**
 * Get the frontmatter metadata for all available blog posts
 */
export async function getAllPostsFrontMatter() {
	const fileNames = readdirSync(BLOG_POSTS_DIR);

	return fileNames
		.map((fileName) => {
			const source = readFileSync(join(BLOG_POSTS_DIR, fileName), 'utf8');
			const { data } = matter(source);

			const frontmatter = data as RawFrontMatter;
			const slug = encodeFileNameToSlug(fileName);

			const bannerPosition = `${convertBannerAxis(frontmatter.banner_x)} ${convertBannerAxis(
				frontmatter.banner_y,
			)}`;

			return {
				...frontmatter,
				slug,
				fileName,
				banner_position: bannerPosition,
			} as FrontMatter;
		})
		.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
		.map((f) => ({
			...f,
			date: format(new Date(f.date), 'PPP'),
		}));
}

/**
 * Get the frontmatter metadata & post MDX contents from file
 *
 * @param {string} slug - Slug / file name of the blog post to load data from
 */
export async function getPost(slug: string): Promise<Post> {
	const fileName = decodeSlugToFileName(slug);
	const raw = readFileSync(join(process.cwd(), 'data', 'blog', fileName), 'utf-8').toString();
	const { content, data } = matter(raw);
	const source = await serialize(content, {
		scope: data,
		mdxOptions: {
			rehypePlugins: [[RehypeAutolinkHeadings, {}]],
			remarkPlugins: [RemarkCodeTitles, RemarkEmoji, RemarkPrism, RemarkSlug],
		},
	});

	const frontmatter = data as RawFrontMatter;

	const bannerPosition = `${convertBannerAxis(frontmatter.banner_x)} ${convertBannerAxis(
		frontmatter.banner_y,
	)}`;

	return {
		frontmatter: {
			...frontmatter,
			date: format(new Date(frontmatter.date), 'PPP'),
			slug,
			fileName,
			banner_position: bannerPosition,
		},
		source,
	};
}

// No need to encodeURIComponent() as the slug will be encoded by Next.js
export function encodeFileNameToSlug(fileName: string): string {
	return fileName.replace(/\.md/, '');
}

// No need to decodeURIComponent() as the slug will be decoded by Next.js
export function decodeSlugToFileName(slug: string): string {
	return `${slug}.md`;
}
