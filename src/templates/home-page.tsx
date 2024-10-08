import PostListView from 'components/posts/post-list-view'
import SEO from 'components/seo'
import Layout from 'components/widgets/layout'
import { graphql, PageProps } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { processPostListData } from 'helpers/processQueryData'
import { PaginationContext } from 'model/utils'

export default function HomePage({
  data: {
    allMarkdownRemark: { edges },
  },
  pageContext,
}: PageProps<Queries.HomePageQuery, PaginationContext>) {
  return (
    <Layout>
      <StaticImage
        src='../images/banner.jpg'
        alt='banner image'
        className='w-full h-[320px] sm:h-[560px] object-cover'
      />
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
  return <SEO />
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
