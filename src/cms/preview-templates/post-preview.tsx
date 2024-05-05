import PostTemplate from '../../components/posts/post-templete'

export default function PostPreview({
  entry,
  widgetFor,
}: {
  entry: any
  widgetFor: (name: any) => JSX.Element | null
}) {
  const data = entry.getIn(['data']).toJS()
  return (
    <div className='py-12 px-6'>
      <PostTemplate
        content={widgetFor('body') ?? <></>}
        activeComments={false}
        date={new Date(data.date).toLocaleDateString()}
        tags={data.tags || []}
        title={data.title}
      />
    </div>
  )
}
