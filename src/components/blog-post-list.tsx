import BlogPostCard, { BlogPostCardProps } from 'components/blog-post-card'

export interface BlogPostListProps {
  posts: BlogPostCardProps[]
}

export default function ({ posts }: BlogPostListProps) {
  return (
    <ul className='flex flex-col'>
      {posts.map((post) => (
        <BlogPostCard {...post} />
      ))}
    </ul>
  )
}
