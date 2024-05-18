import { Link } from 'gatsby'
import useTagMetaDataQuery from 'hooks/query/useTagMetaDataQuery'

function TagNavigationButton({
  tag,
  totalCount,
}: Queries.TagMetaDataQuery['allMarkdownRemark']['group'][0]) {
  return (
    <li key={tag}>
      <Link
        to={`/tags/${tag}`}
        className='tag-chip whitespace-nowrap'
        activeClassName='text-indigo-700 bg-indigo-200 border-2 border-solid border-indigo-700'
        partiallyActive={true}
      >
        {tag} ({totalCount})
      </Link>
    </li>
  )
}

export default function TagNavigationButtons({
  className,
}: {
  className?: string
}) {
  const {
    allMarkdownRemark: { group },
  } = useTagMetaDataQuery()

  return (
    <ul
      className={`center-content overflow-x-auto scrollbar-hide flex gap-2 items-center !pb-0 ${className}`}
    >
      {group.map(({ tag, totalCount }) => (
        <TagNavigationButton key={tag} tag={tag} totalCount={totalCount} />
      ))}
    </ul>
  )
}
