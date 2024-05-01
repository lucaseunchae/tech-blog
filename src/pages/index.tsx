import PostList from 'components/posts/post-list'
import { graphql, PageProps } from 'gatsby'
import { processPostListData } from 'helpers/processQueryData'
import generatePageTitle from 'utils/generatePageTitle'
import Layout from 'widgets/layout'

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
  return <title>{generatePageTitle('Home')}</title>
}

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { templateKey: { eq: "post" } } }
    ) {
      edges {
        ...PostListItem
      }
    }
  }
`
