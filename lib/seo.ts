import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = '虹色的世界';
	const description = 'Suwako的博客';

	return {
		title,
		description,
		canonical: `https://suwako.dev${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: title,
			url: `https://suwako.dev${router.asPath}`,
			type: 'website',
			images: [
				{
					url: `https://suwako.dev/banner.jpg`,
					alt: description,
					width: 720,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@suwakopro',
			site: '@suwakopro',
		},
		...props,
	};
}
