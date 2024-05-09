import { graphql, useStaticQuery } from 'gatsby'

export default function () {
  const query = graphql`
    query TagMetaData {
      allMarkdownRemark(sort: { frontmatter: { tags: DESC } }) {
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `
  
  return useStaticQuery<Queries.TagMetaDataQuery>(query)
}
