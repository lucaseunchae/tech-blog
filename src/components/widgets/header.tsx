import { Link } from 'gatsby'

export default function () {
  return (
    <header className='z-10 fixed top-0 flex items-center justify-between w-full h-[--header-height] md:h-[--md-header-height] border-b border-solid border-gray-200 bg-white transition-all duration-700'>
      <Link
        to='/'
        className='flex items-center h-full px-4 md:px-8 text-lg md:text-2xl font-semibold'
      >
        eunchae.blog
      </Link>
      <nav className='flex w-max h-full text-md md:text-lg text-slate-500'>
        <Link
          to='/about'
          className='flex items-center h-full px-4 md:px-8 hover:text-black'
          activeClassName='text-black font-medium'
        >
          About
        </Link>
        <Link
          to='/posts'
          className='flex items-center h-full px-4 md:px-8 hover:text-black'
          activeClassName='text-black font-medium'
        >
          Posts
        </Link>
      </nav>
    </header>
  )
}
