import PostListView from 'components/posts/post-list-view'
import SEO from 'components/seo'
import Layout from 'components/widgets/layout'
import { graphql, PageProps } from 'gatsby'
import { processPostListData } from 'helpers/processQueryData'
import { PaginationContext } from 'model/utils'

export default function PostsPage({
  data: {
    allMarkdownRemark: { edges },
  },
  pageContext,
}: PageProps<Queries.PostsPageQuery, PaginationContext>) {
  return (
    <Layout>
      <PostListView
        posts={processPostListData(edges)}
        pageContext={pageContext}
        title='Posts'
        baseUrl='/posts'
      />
    </Layout>
  )
}

export function Head() {
  return <SEO title='Posts' />
}

export const query = graphql`
  query PostsPage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { templateKey: { eq: "post" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        ...PostListItem
      }
    }
  }
`
