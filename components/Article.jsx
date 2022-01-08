import cx from 'classnames';

export default function Article({ content, className }) {
  return (
    <article
      className={cx(
        'prose prose-stone px-4 m-auto my-4 sm:my-16 text-stone-500 prose-headings:text-stone-600 leading-relaxed',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
