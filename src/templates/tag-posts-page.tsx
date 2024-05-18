import PostListView from 'components/posts/post-list-view'
import SEO from 'components/seo'
import Layout from 'components/widgets/layout'
import { graphql, HeadProps, PageProps } from 'gatsby'
import { processPostListData } from 'helpers/processQueryData'

import { TagPostsPageContext } from '../../gatsby-node'

export default function TagPostsPage({
  data: {
    allMarkdownRemark: { edges },
  },
  pageContext,
}: PageProps<Queries.PostsPageQuery, TagPostsPageContext>) {
  return (
    <Layout>
      <PostListView
        posts={processPostListData(edges)}
        pageContext={pageContext}
        title={pageContext.tag}
        baseUrl={`/tags/${pageContext.tag}`}
      />
    </Layout>
  )
}

export function Head({
  pageContext: { tag },
}: HeadProps<Queries.PostDetailPageQuery, TagPostsPageContext>) {
  return <SEO title={tag} />
}

export const query = graphql`
  query TagPostsPage($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { templateKey: { eq: "post" }, tags: { in: [$tag] } }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        ...PostListItem
      }
    }
  }
`
