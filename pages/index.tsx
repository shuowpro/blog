import styled from '@emotion/styled';
import tw from 'twin.macro';
import { differenceInYears, isSameDay, isSameMonth } from 'date-fns';
import { Icon } from '@iconify/react';

import { Button, Pill, Transition, Wave } from '~/components';
import { NavigationItemType, WithChildren } from '~/types';
import { Layout } from '~/layouts';
import { usePersistantState } from '~/lib';

import type { NavigationItem } from '~/types';

const Container = styled.div(tw`
	min-h-screen flex items-center justify-center \
	py-12
`);

const Content = styled.div(tw`
	max-w-md sm:max-w-lg md:sm:max-w-2xl lg:sm:max-w-3xl w-full space-y-8 \
	text-center
`);

const Title = styled.h1(tw`
	text-gray-500 dark:text-white \
	text-4xl sm:text-5xl md:text-5xl lg:text-7xl \
	tracking-tight font-extrabold
`);

const Description = styled.p(tw`
	max-w-xs \
	mt-4 md:mt-8 mx-auto \
	text-base text-gray-300 sm:text-lg md:text-xl md:max-w-3xl
`);

const LineBreak = styled.br(tw`
	hidden sm:block
`);

const StyledPill = styled(Pill.Standard)(tw`
	mt-4
`);

const Actions = styled.div`
	${tw`
		flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0 w-full \
		mt-8 sm:mt-4
	`}

	div {
		${tw`
			w-full sm:w-auto
		`}
	}
`;

const ActionIcon = styled(Icon)(tw`
	mr-3
`);

const ActionText = styled.span(tw`
	-mt-1 py-1
`);

const ACTIONS: Array<NavigationItem> = [
	{
		type: NavigationItemType.LINK,
		href: '/blog',
		icon: <ActionIcon icon="feather:edit-3" />,
		text: '博客',
	},
	// {
	// 	type: NavigationItemType.LINK,
	// 	href: '/projects',
	// 	icon: <ActionIcon icon="feather:copy" />,
	// 	text: 'Projects',
	// },
	{
		type: NavigationItemType.LINK,
		external: true,
		href: 'https://github.com/leuction',
		icon: <ActionIcon icon="feather:github" />,
		text: 'GitHub',
	},
];

export default function HomePage() {
	const { animations: animations } = usePersistantState().get();

	// const description = `介绍`;

	return (
		<Layout.Default>
			<Container>
				<Content>
					<Transition duration={1000} enabled={animations}>
						<Title>
							大家好 <Wave>👋</Wave> 我是Suwako, <LineBreak />
							我是一名 <StyledPill>开发者</StyledPill>
						</Title>
					</Transition>
					{/* <Transition delay={500} duration={1000} enabled={animations}>
						<Description>{description}</Description>
					</Transition> */}
					<Actions>
						{ACTIONS.map((action, index) => {
							if (action.type !== NavigationItemType.LINK) return null;

							return (
								<Transition
									delay={300 + index * 100}
									key={index}
									duration={1000}
									enabled={animations}>
									<Button.Outline href={action.href}>
										{action.icon}
										<ActionText>{action.text}</ActionText>
									</Button.Outline>
								</Transition>
							);
						})}
					</Actions>
				</Content>
			</Container>
		</Layout.Default>
	);
}
