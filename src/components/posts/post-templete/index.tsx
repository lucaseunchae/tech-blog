import { ReactNode } from 'react'

import MarkdownSection from './markdown-section'
import PostInfoSection from './post-info-section'
import TableOfContents from './table-of-contents'

export interface PostTempleteProps {
  content: string | ReactNode
  tableOfContents?: string
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
      {tableOfContents && <TableOfContents tableOfContents={tableOfContents} />}
      <MarkdownSection content={content} />
    </div>
  )
}
