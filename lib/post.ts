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

			return {
				...frontmatter,
				slug,
				fileName,
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

	return {
		frontmatter: {
			...frontmatter,
			date: format(new Date(frontmatter.date), 'PPP'),
			slug,
			fileName,
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
