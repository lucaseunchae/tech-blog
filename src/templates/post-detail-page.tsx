import PostTemplate from 'components/posts/post-templete'
import Layout from 'components/widgets/layout'
import { graphql, HeadProps, PageProps } from 'gatsby'
import { processPostTempleteData } from 'helpers/processQueryData'
import throttle from 'lodash.throttle'
import { useEffect } from 'react'
import generatePageTitle from 'utils/generatePageTitle'

export default function ({
  data: { markdownRemark: post },
}: PageProps<Queries.PostDetailPageQuery>) {
  useEffect(() => {
    const handleScroll = throttle(() => {
      const allTocLinks = document.querySelectorAll('.table-of-contents a')
      const headers = document.querySelectorAll('h2, h3, h4, h5, h6')

      headers.forEach((header) => {
        const headerY = header.getBoundingClientRect().y

        if (headerY > 100) return

        const tocLink = document.querySelector(
          `.table-of-contents a[href='#${encodeURI(header.id)}']`
        )

        allTocLinks.forEach((link) => {
          link.classList.remove('active')
        })

        tocLink?.classList.add('active')
      })
    }, 200)

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
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
      tableOfContents
    }
  }
`
