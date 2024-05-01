import PostTemplate from 'components/posts/post-template'
import Layout from 'components/widgets/layout'
import { graphql, HeadProps, PageProps } from 'gatsby'
import { processPostTempleteData } from 'helpers/processQueryData'
import generatePageTitle from 'utils/generatePageTitle'

export default function ({
  data: { markdownRemark: post },
}: PageProps<Queries.PostDetailPageQuery>) {
  return (
    <Layout>
      <PostTemplate {...processPostTempleteData(post)} />
    </Layout>
  )
}

export function Head({ data }: HeadProps<Queries.PostDetailPageQuery>) {
  const postTitle = data.markdownRemark!.frontmatter!.title!
  return <title>{generatePageTitle(postTitle)}</title>
}

export const query = graphql`
  query PostDetailPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
