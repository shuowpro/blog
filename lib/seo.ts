import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = '无何有之乡';
	const description = "Hey 👋 I'm Shuo, a developer";

	return {
		title,
		description,
		canonical: `https://suwako.dev/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'suwako',
			url: `https://suwako.dev/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: '/banner.png',
					alt: description,
					width: 1280,
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
