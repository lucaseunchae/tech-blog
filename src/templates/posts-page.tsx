import PaginationBar from 'components/pagination-bar'
import PostList from 'components/posts/post-list'
import { graphql, PageProps } from 'gatsby'
import { processPostListData } from 'helpers/processQueryData'
import { PaginationContext } from 'model/utils'
import generatePageTitle from 'utils/generatePageTitle'
import Layout from 'widgets/layout'

export default function ({
  data: {
    allMarkdownRemark: { edges },
  },
  pageContext,
}: PageProps<Queries.PostsPageQuery, PaginationContext>) {
  return (
    <Layout>
      <div className='center-content'>
        <h1 className='page-title'>Posts</h1>
        <PostList posts={processPostListData(edges)} />
        <PaginationBar {...pageContext} />
      </div>
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
