import dayjs from 'dayjs'

export default function () {
  return (
    <footer className='py-5 border-t border-solid border-gray-200'>
      <p className='text-center text-xs md:text-base text-gray-400'>
        © {dayjs().format('YYYY')} Eunchae Kim. All rights reserved.
      </p>
    </footer>
  )
}
