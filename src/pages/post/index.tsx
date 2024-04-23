import BlogPostList from 'components/blog-post-list'
import Layout from 'components/layout'
import { graphql, PageProps } from 'gatsby'
import { processBlogPostPageQueryData } from 'helpers/processQueryData'
import genPageTitle from 'utils/genPageTitle'

export default function ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PageProps<Queries.BlogPostPageQuery>) {
  return (
    <Layout>
      <div className='center-content py-10 md:py-20'>
        <h1 className='text-4xl font-bold mb-14'>Post</h1>
        <BlogPostList posts={processBlogPostPageQueryData(edges)} />
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
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMM DD, YYYY")
            featuredimage
            tags
          }
        }
      }
    }
  }
`
