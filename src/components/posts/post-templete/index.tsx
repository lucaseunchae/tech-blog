import { ReactNode } from 'react'

import MarkdownSection from './markdown-section'
import PostInfoSection from './post-info-section'
import TableOfContents from './table-of-contents'
import UtterancesComments from './utterances-comments'

export interface PostTempleteProps {
  content: string | ReactNode
  tableOfContents?: string
  activeComments?: boolean
  date: string
  tags: string[]
  title: string
}

export default function ({
  content,
  tableOfContents,
  activeComments = true,
  date,
  tags,
  title,
}: PostTempleteProps) {
  return (
    <div className='center-content relative'>
      <PostInfoSection title={title} date={date} tags={tags} />
      {tableOfContents && <TableOfContents tableOfContents={tableOfContents} />}
      <MarkdownSection content={content} />
      {activeComments && <UtterancesComments />}
    </div>
  )
}
