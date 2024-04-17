import { Link } from 'gatsby'

export default function () {
  return (
    <header className='flex items-center justify-between h-16 md:h-24 print:hidden'>
      <Link
        to='/'
        className='flex items-center h-full px-4 md:px-8 text-lg sm:text-xl font-medium'
      >
        eunchae.blog
      </Link>
      <nav className='flex w-max h-full text-md sm:text-lg text-slate-400'>
        <Link
          to='/about'
          className='flex items-center h-full px-4 md:px-8'
          activeClassName='text-slate-800 font-medium'
        >
          About
        </Link>
        <Link
          to='/post'
          className='flex items-center h-full px-4 md:px-8'
          activeClassName='text-slate-800 font-medium'
        >
          Post
        </Link>
      </nav>
    </header>
  )
}
