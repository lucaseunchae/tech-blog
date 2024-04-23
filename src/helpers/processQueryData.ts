import { BlogPostCardProps } from 'components/blog-post-card'

export const processBlogPostPageQueryData = (
  edges: Queries.BlogPostPageQuery['allMarkdownRemark']['edges']
): BlogPostCardProps[] => {
  return edges.map(({ node }) => ({
    key: node.id,
    img: node.frontmatter!.featuredimage!,
    slug: node.fields!.slug!,
    title: node.frontmatter!.title!,
    desc: node.frontmatter!.description!,
    date: node.frontmatter!.date!,
    tags: node.frontmatter!.tags as string[],
  }))
}
