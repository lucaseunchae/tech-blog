import BlogPostList from 'components/blog-post-list'
import Layout from 'components/layout'
import { graphql, PageProps } from 'gatsby'
import { processBlogPostCardFragmentData } from 'helpers/processQueryData'
import genPageTitle from 'utils/genPageTitle'

export default function ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PageProps<Queries.BlogPostPageQuery>) {
  return (
    <Layout>
      <div className='center-content'>
        <h1 className='page-title'>Post</h1>
        <BlogPostList posts={processBlogPostCardFragmentData(edges)} />
      </div>
    </Layout>
  )
}

export function Head() {
  return <title>{genPageTitle('Posts')}</title>
}

export const query = graphql`
  query BlogPostPage {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        ...BlogPostCard
      }
    }
  }
`
