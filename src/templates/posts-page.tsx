import PostListView from 'components/posts/post-list-view'
import Layout from 'components/widgets/layout'
import { graphql, PageProps } from 'gatsby'
import { processPostListData } from 'helpers/processQueryData'
import { PaginationContext } from 'model/utils'
import generatePageTitle from 'utils/generatePageTitle'

export default function ({
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
      />
    </Layout>
  )
}

export function Head() {
  return <title>{generatePageTitle('Posts')}</title>
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
