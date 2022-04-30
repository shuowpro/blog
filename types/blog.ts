import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface RawFrontMatter {
	banner_alt?: string;
	banner_show?: boolean;
	banner?: string;
	date: string;
	description_show?: boolean;
	description?: string;
	title_prefix?: string;
	title: string;
}

export interface FrontMatter extends RawFrontMatter {
	// encoded, trim .md extension name
	slug: string;
	// raw file name, not encoded, with .md extension
	fileName: string;
}

export interface Post {
	frontmatter: FrontMatter;
	source: MDXRemoteSerializeResult;
}
