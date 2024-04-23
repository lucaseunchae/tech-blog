import clsx from 'clsx'
import { ReactNode } from 'react'

export default function ({
  tags,
  className,
  ...props
}: {
  tags: ReactNode[]
  className?: string
}) {
  return (
    <ul className={clsx('flex gap-1.5 flex-wrap', className)} {...props}>
      {tags.map((tag, idx) => (
        <li key={idx} className='text-xs font-semibold text-indigo-600'>
          {tag}
        </li>
      ))}
    </ul>
  )
}
