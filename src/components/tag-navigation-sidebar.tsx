import { graphql, Link, useStaticQuery } from 'gatsby'

function TagNavigationItem({
  tag,
  totalCount,
}: Queries.TagMetaDataQuery['allMarkdownRemark']['group'][0]) {
  return (
    <li key={tag} className='leading-7 text-sm'>
      <Link
        to={`/tags/${tag}`}
        className='hover:text-indigo-700'
        activeClassName='text-indigo-700 font-semibold'
      >
        {tag} ({totalCount})
      </Link>
    </li>
  )
}

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

export default function () {
  const {
    allMarkdownRemark: { group },
  } = useStaticQuery<Queries.TagMetaDataQuery>(query)

  return (
    <div className='hidden xl:block sticky top-0'>
      <div className='absolute top-0 left-0 flex flex-col justify-center w-52 h-screen py-[--md-header-height] border-r border-solid border-gray-100'>
        <div className='overflow-y-auto h-[90%] px-6'>
          <h5 className='mb-4 text-lg font-semibold text-gray-700 pb-2 border-b-2 border-solid border-gray-500'>
            태그
          </h5>
          <ul>
            {group.map(({ tag, totalCount }) => (
              <TagNavigationItem tag={tag} totalCount={totalCount} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
