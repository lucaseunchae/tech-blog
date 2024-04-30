import { PostCardProps } from 'components/post-card'

export const processPostCardFragmentData = (
  edges: ReadonlyArray<Queries.PostCardFragment>
): PostCardProps[] => {
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
