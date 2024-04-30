import PostCard, { PostCardProps } from 'components/post-card'

export interface PostListProps {
  posts: PostCardProps[]
}

export default function ({ posts }: PostListProps) {
  return (
    <ul className='flex flex-col'>
      {posts.map((post) => (
        <PostCard {...post} />
      ))}
    </ul>
  )
}
