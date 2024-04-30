import Layout from 'components/layout'
import PostTemplate from 'components/post-template'
import { graphql, HeadProps, PageProps } from 'gatsby'
import genPageTitle from 'utils/genPageTitle'

export default function ({
  data: { markdownRemark: post },
}: PageProps<Queries.PostDetailPageQuery>) {
  if (!post) return null
  return (
    <Layout>
      <PostTemplate
        content={post.html ?? ''}
        date={post.frontmatter?.date ?? ''}
        tags={post.frontmatter?.tags ?? ['프론트엔드']}
        title={post.frontmatter?.title ?? ''}
      />
    </Layout>
  )
}

export function Head({ data }: HeadProps<Queries.PostDetailPageQuery>) {
  const postTitle = data.markdownRemark?.frontmatter?.title
  return <title>{genPageTitle(postTitle)}</title>
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
