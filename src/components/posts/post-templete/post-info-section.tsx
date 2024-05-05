import { PostTempleteProps } from 'components/posts/post-templete'
import dayjs from 'dayjs'
import { Link } from 'gatsby'

export default function ({
  title,
  date,
  tags,
}: Pick<PostTempleteProps, 'title' | 'date' | 'tags'>) {
  return (
    <section className='flex flex-col gap-4 mb-20 pb-8 border-b border-solid border-gray-200'>
      <h1 className='text-5xl font-bold'>{title}</h1>
      <time className='text-gray-400 font-medium'>
        {dayjs(date).format('YYYY.MM.DD')}
      </time>
      <ul className='flex gap-3 flex-wrap'>
        {tags.map((tag, idx) => (
          <li
            key={idx}
            className='rounded-xl bg-indigo-100 hover:bg-indigo-200 font-semibold text-indigo-600'
          >
            <Link to={`/tags/${tag}`} className='inline-block px-2.5 py-1'>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
