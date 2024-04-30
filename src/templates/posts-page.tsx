import Layout from 'components/layout'
import PostList from 'components/post-list'
import { graphql, PageProps } from 'gatsby'
import { processPostListData } from 'helpers/processQueryData'
import genPageTitle from 'utils/genPageTitle'

export default function ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PageProps<Queries.PostsPageQuery>) {
  return (
    <Layout>
      <div className='center-content'>
        <h1 className='page-title'>Posts</h1>
        <PostList posts={processPostListData(edges)} />
      </div>
    </Layout>
  )
}

export function Head() {
  return <title>{genPageTitle('Posts')}</title>
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
