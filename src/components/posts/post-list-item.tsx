import { graphql, Link } from 'gatsby'

export interface PostListItemProps {
  key: string
  img: string
  slug: string
  title: string
  desc: string
  date: string
  tags: string[]
}

export default function ({
  img,
  slug,
  title,
  desc,
  date,
  tags,
}: PostListItemProps) {
  return (
    <li className='border-b border-solid border-gray-200'>
      <Link to={slug} className='flex gap-x-5 md:gap-x-8 w-full py-4 md:py-8'>
        <img
          src={img}
          className='w-24 md:w-52 rounded-lg aspect-square object-cover'
        />

        <div className='flex-1'>
          <div className='flex flex-wrap items-center gap-3 mb-2'>
            <time className='block text-xs font-semibold text-gray-400'>
              {date}
            </time>
            <ul className='flex gap-2 flex-wrap'>
              {tags.map((tag, idx) => (
                <li key={idx} className='text-xs font-semibold text-indigo-600'>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='text-lg md:text-3xl font-semibold line-clamp-2'>
              {title}
            </h2>
            <h3 className='line-clamp-2 md:line-clamp-4 mt-1 md:mt-4 text-sm md:text-base text-slate-700 '>
              {desc}
            </h3>
          </div>
        </div>
      </Link>
    </li>
  )
}

export const postListItemFragment = graphql`
  fragment PostListItem on MarkdownRemarkEdge {
    node {
      id
      fields {
        slug
      }
      frontmatter {
        title
        description
        templateKey
        date(formatString: "YYYY.MM.DD")
        featuredimage
        tags
      }
    }
  }
`
