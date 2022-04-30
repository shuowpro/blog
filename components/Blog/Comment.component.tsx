import styled from '@emotion/styled';
import tw from 'twin.macro';
import Giscus from '@giscus/react';

const Container = styled.section(tw`
  max-w-prose mx-auto mt-4 mb-32 px-4
`);

export function Comment() {
	return (
		<Container>
			<Giscus
				repo="leuction/blog"
				repoId="MDEwOlJlcG9zaXRvcnkzODQ3NDUwNjQ="
				category="Announcements"
				categoryId="DIC_kwDOFu6-aM4CAXex"
				mapping="pathname"
				reactionsEnabled="1"
				emitMetadata="0"
				theme="light"
				lang="zh-CN"
			/>
		</Container>
	);
}
