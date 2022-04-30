import { useMemo } from 'react';
import { useTheme } from 'next-themes';

import { Status } from '~/components';
import { usePersistantState, useStatus } from '~/lib';

import { DiscordStatus, NavigationItemType, Theme } from '~/types';

import type { NavigationItem, NavigationItems } from '~/types';

const staticMenuItems: Array<Array<NavigationItem>> = [
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:home',
			text: '主页',
			href: '/',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:edit-3',
			text: '博客',
			href: '/blog',
		},
		// {
		// 	type: NavigationItemType.LINK,
		// 	icon: 'feather:copy',
		// 	text: 'Projects',
		// 	href: '/projects',
		// },
		// {
		// 	type: NavigationItemType.LINK,
		// 	icon: 'feather:clock',
		// 	text: 'Timeline',
		// 	href: '/timeline',
		// },
		// {
		// 	type: NavigationItemType.LINK,
		// 	icon: 'feather:link',
		// 	text: 'Referrals',
		// 	href: '/referrals',
		// },
	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:twitter',
			text: 'Twitter',
			href: 'https://twitter.com/suwakopro',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:github',
			text: 'GitHub',
			href: 'https://github.com/leuction',
			external: true,
		},
	],
];

export function useNavigation() {
	const state = usePersistantState();
	const { animations: background } = state.get();
	const { color, loading, status } = useStatus();
	const { theme, setTheme } = useTheme();

	const isDark = useMemo(() => {
		if (theme === Theme.SYSTEM)
			return window.matchMedia('(prefers-color-scheme: dark)').matches;

		return theme === Theme.DARK;
	}, [theme]);

	const menuItems = staticMenuItems;

	// const menuItems: NavigationItems = [
	// 	...staticMenuItems,
	// 	...(!loading && status
	// 		? [
	// 				[
	// 					{
	// 						type: NavigationItemType.LINK,
	// 						icon: (
	// 							<Status.Indicator
	// 								color={color}
	// 								pulse={status.discord_status !== 'offline'}
	// 							/>
	// 						),
	// 						text: 'Status',
	// 						href: '/status',
	// 					} as NavigationItem,
	// 				],
	// 		  ]
	// 		: []),
	// ];

	const settingsItems: NavigationItems = [
		[
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:image',
				endIcon: background ? 'feather:check-square' : 'feather:square',
				text: `动画${background ? '开' : '关'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						animations: !settings.animations,
					})),
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:moon',
				endIcon: isDark ? 'feather:check-square' : 'feather:square',
				text: `${isDark ? '深色' : '浅色'}主题`,
				onClick: () => setTheme(isDark ? 'light' : 'dark'),
			},
		],
	];

	return {
		menu: menuItems,
		settings: settingsItems,
	};
}
