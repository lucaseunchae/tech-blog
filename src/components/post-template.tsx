import dayjs from 'dayjs'
import { ReactNode } from 'react'

function MarkdownSection({ content }: { content: string | ReactNode }) {
  const markdownSectionClassName =
    'prose prose-lg max-w-none prose-slate prose-code:before:hidden prose-code:after:hidden'
  return (
    <>
      {typeof content === 'string' ? (
        <div
          className={markdownSectionClassName}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className={markdownSectionClassName}>{content}</div>
      )}
    </>
  )
}

export default function ({
  content,
  date,
  tags,
  title,
}: {
  content: string | ReactNode
  date: string
  tags: ReadonlyArray<string | null>
  title: string
}) {
  return (
    <div className='center-content'>
      <section className='text-center'>
        <div className='text-xl font-light mb-3 text-slate-500'>
          <time>{dayjs(date).format('MMM D, YYYY')}</time>
          {tags && <> &mdash; {tags.join(', ')}</>}
        </div>
        <h1 className='text-4xl font-bold mb-20'>{title}</h1>
      </section>
      <MarkdownSection content={content} />
    </div>
  )
}
