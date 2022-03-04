import { Giscus } from '@giscus/react';

export default function Article({ content, className }) {
  return (
    <section className="max-w-prose mx-auto mt-4 mb-32 px-4">
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
    </section>
  );
}
