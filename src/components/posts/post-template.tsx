import dayjs from 'dayjs'
import { ReactNode } from 'react'

function PostInfoSection({
  title,
  date,
  tags,
}: Pick<PostTempleteProps, 'title' | 'date' | 'tags'>) {
  return (
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
  )
}

function TableOfContents({
  tableOfContents,
}: Pick<PostTempleteProps, 'tableOfContents'>) {
  return (
    <div className='table-of-contents'>
      <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
    </div>
  )
}

function MarkdownSection({ content }: Pick<PostTempleteProps, 'content'>) {
  const markdownSectionClassName =
    'markdown prose prose-lg max-w-none prose-slate prose-code:before:hidden prose-code:after:hidden'
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

export interface PostTempleteProps {
  content: string | ReactNode
  tableOfContents: string
  date: string
  tags: string[]
  title: string
}

export default function ({
  content,
  tableOfContents,
  date,
  tags,
  title,
}: PostTempleteProps) {
  return (
    <div className='center-content !max-w-3xl relative'>
      <PostInfoSection title={title} date={date} tags={tags} />
      <TableOfContents tableOfContents={tableOfContents} />
      <MarkdownSection content={content} />
    </div>
  )
}
