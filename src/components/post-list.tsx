import PostListItem, { PostListItemProps } from 'components/post-list-item'

export interface PostListProps {
  posts: PostListItemProps[]
}

export default function ({ posts }: PostListProps) {
  return (
    <ul className='flex flex-col'>
      {posts.map((post) => (
        <PostListItem {...post} />
      ))}
    </ul>
  )
}
