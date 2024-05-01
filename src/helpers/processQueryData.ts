import { PostListItemProps } from 'components/posts/post-list-item'
import { PostTempleteProps } from 'components/posts/post-template'

export const processPostListData = (
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

export const processPostTempleteData = (
  post: Queries.PostDetailPageQuery['markdownRemark']
): PostTempleteProps => {
  return {
    content: post!.html!,
    date: post!.frontmatter!.date!,
    tags: post!.frontmatter!.tags as string[],
    title: post!.frontmatter!.title!,
  }
}
