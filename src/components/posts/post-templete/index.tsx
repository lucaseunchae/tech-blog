import { ReactNode } from 'react'

import AuthorInfo from './author-info'
import MarkdownContent from './markdown-content'
import PostComments from './post-comments'
import PostInfo from './post-info'
import TableOfContents from './table-of-contents'

export interface PostTempleteProps {
  content: string | ReactNode
  tableOfContents?: string
  activeComments?: boolean
  date: string
  tags: string[]
  title: string
}

export default function PostTemplete({
  content,
  tableOfContents,
  activeComments = true,
  date,
  tags,
  title,
}: PostTempleteProps) {
  return (
    <div className='center-content relative'>
      <PostInfo title={title} date={date} tags={tags} />
      {tableOfContents && <TableOfContents tableOfContents={tableOfContents} />}
      <MarkdownContent content={content} />
      <AuthorInfo />
      {activeComments && <PostComments />}
    </div>
  )
}
