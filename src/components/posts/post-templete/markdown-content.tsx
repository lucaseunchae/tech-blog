import { PostTempleteProps } from 'components/posts/post-templete'

export default function ({ content }: Pick<PostTempleteProps, 'content'>) {
  const markdownContentClassName =
    'markdown prose prose-lg max-w-none prose-slate prose-code:before:hidden prose-code:after:hidden'
  return (
    <>
      {typeof content === 'string' ? (
        <div
          className={markdownContentClassName}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className={markdownContentClassName}>{content}</div>
      )}
    </>
  )
}
