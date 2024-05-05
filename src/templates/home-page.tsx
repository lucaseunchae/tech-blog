import PaginationBar from 'components/pagination-bar'
import PostList from 'components/posts/post-list'
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
}: PageProps<Queries.HomePageQuery, PaginationContext>) {
  return (
    <Layout>
      <div className='relative flex justify-center items-center w-full h-[320px] sm:h-[560px]'>
        <img
          src='images/banner-image.jpg'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='center-content'>
        <h1 className='page-title'>Posts({pageContext.totalElements})</h1>
        <PostList posts={processPostListData(edges)} />
        <PaginationBar {...pageContext} />
      </div>
    </Layout>
  )
}

export function Head() {
  return <title>{generatePageTitle()}</title>
}

export const query = graphql`
  query HomePage($skip: Int!, $limit: Int!) {
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
