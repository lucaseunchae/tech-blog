import BlogPostCard, { BlogPostCardProps } from 'components/blog-post-card'

export interface BlogPostListProps {
  posts: BlogPostCardProps[]
}

export default function ({ posts }: BlogPostListProps) {
  return (
    <ul className='flex flex-col gap-y-8 md:gap-y-16'>
      {posts.map((post) => (
        <BlogPostCard {...post} />
      ))}
    </ul>
  )
}
