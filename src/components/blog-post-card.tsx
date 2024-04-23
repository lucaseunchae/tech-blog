import Tags from 'components/tags'
import { graphql, Link } from 'gatsby'

export interface BlogPostCardProps {
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
}: BlogPostCardProps) {
  return (
    <li className='w-full flex gap-x-5 md:gap-x-8'>
      <Link to={slug} className='w-20 md:w-52'>
        <img
          src={img}
          className='w-full rounded-lg aspect-square object-cover'
        />
      </Link>

      <div className='flex-1'>
        <div className='flex flex-wrap items-center gap-3 mb-2'>
          <time className='block text-xs font-bold text-gray-400'>{date}</time>
          <Tags tags={tags.filter((tag) => tag !== null)} />
        </div>
        <Link to={slug} className='block mb-2'>
          <h2 className='text-lg md:text-3xl font-bold line-clamp-2'>
            {title}
          </h2>
          <h3 className='hidden md:line-clamp-4 mt-4 text-md text-slate-700 '>
            {desc}
          </h3>
        </Link>
      </div>
    </li>
  )
}

export const blogPostCardFragment = graphql`
  fragment BlogPostCard on MarkdownRemarkEdge {
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
`
