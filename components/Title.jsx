import Image from 'next/image';
import cx from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export default function Title({ meta, className, readTime }) {
  return (
    meta && (
      <section className={cx('w-full', className)}>
        {meta.title && (
          <div className="w-full text-stone-800">
            <h1 className="tracking-wider text-center text-5xl font-black">
              {meta.title}
            </h1>
          </div>
        )}
        {meta.description && (
          <div className="w-full text-stone-500 mt-2">
            <h1 className="text-center text-xl">{meta.description}</h1>
          </div>
        )}
        <div className="w-full mx-auto text-center mt-4">
          {meta.date && (
            <time>{`${dayjs(meta.date).locale('zh-cn').format('LL')} · `}</time>
          )}
          <span>{`阅读时间${readTime}分钟`}</span>
        </div>
        {meta.cover && (
          <div className="w-full aspect-square md:aspect-video lg:aspect-5/2 relative mt-10">
            <Image
              alt={meta.cover}
              src={meta.cover}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </section>
    )
  );
}
