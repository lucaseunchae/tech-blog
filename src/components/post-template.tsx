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
  tags: string[]
  title: string
}) {
  return (
    <div className='center-content'>
      <section className='flex flex-col gap-4 mb-20 pb-8 border-b border-solid border-gray-200'>
        <h1 className='text-5xl font-bold'>{title}</h1>
        <time className='text-gray-400 font-medium'>
          {dayjs(date).format('YYYY.MM.DD')}
        </time>
        <ul className='flex gap-3 flex-wrap'>
          {tags.map((tag, idx) => (
            <li
              key={idx}
              className='px-2.5 py-1 rounded-xl bg-indigo-100 font-semibold text-indigo-600'
            >
              {tag}
            </li>
          ))}
        </ul>
      </section>
      <MarkdownSection content={content} />
    </div>
  )
}
