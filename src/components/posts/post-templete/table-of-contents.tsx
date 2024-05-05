import { PostTempleteProps } from 'components/posts/post-templete'

export default function ({
  tableOfContents,
}: Pick<PostTempleteProps, 'tableOfContents'>) {
  return (
    <div className='table-of-contents'>
      <div dangerouslySetInnerHTML={{ __html: tableOfContents! }} />
    </div>
  )
}
