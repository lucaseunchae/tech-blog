import { PostTempleteProps } from 'components/posts/post-templete'

export default function ({ content }: Pick<PostTempleteProps, 'content'>) {
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
