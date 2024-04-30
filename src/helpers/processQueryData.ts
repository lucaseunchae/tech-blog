import { PostListItemProps } from 'components/post-list-item'

export const processPostListItemFragmentData = (
  edges: ReadonlyArray<Queries.PostListItemFragment>
): PostListItemProps[] => {
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
