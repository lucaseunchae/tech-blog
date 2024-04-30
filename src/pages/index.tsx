import Layout from 'components/layout'
import PostList from 'components/post-list'
import { graphql, PageProps } from 'gatsby'
import { processPostListData } from 'helpers/processQueryData'
import genPageTitle from 'utils/genPageTitle'

export default function IndexPage({
  data: {
    allMarkdownRemark: { edges },
  },
}: PageProps<Queries.IndexPageQuery>) {
  return (
    <Layout>
      <div className='relative flex justify-center items-center w-full h-[320px] sm:h-[560px]'>
        <img
          src='images/banner-image.jpg'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='center-content'>
        <h1 className='page-title'>Posts</h1>
        <PostList posts={processPostListData(edges)} />
      </div>
    </Layout>
  )
}

export function Head() {
  return <title>{genPageTitle()}</title>
}

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        ...PostListItem
      }
    }
  }
`
