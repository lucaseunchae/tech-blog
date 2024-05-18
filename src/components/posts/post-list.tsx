import PostListItem, {
  PostListItemProps,
} from 'components/posts/post-list-item'

export interface PostListProps {
  posts: PostListItemProps[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className='flex flex-col'>
      {posts.map((post) => (
        <PostListItem {...post} />
      ))}
    </ul>
  )
}
