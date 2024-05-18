import { StaticImage } from 'gatsby-plugin-image'

import GithubLogoIcon from '../../icons/github-logo-icon'
import MailIcon from '../../icons/mail-icon'

export default function AuthorInfo() {
  return (
    <div className='flex items-center gap-2 mt-28 py-8'>
      <StaticImage
        src='../../../images/author-profile.jpg'
        alt='author profile image'
        className='w-20 h-20 mr-2 rounded-full border border-solid border-gray-200'
      />
      <span className='font-semibold text-2xl'>김은채</span>
      <span className='text-gray-400 font-medium text-xs'>Web Frontend</span>
      <a href='https://github.com/lucaseunchae' target='_blank' className='p-1'>
        <GithubLogoIcon width={20} height={20} />
      </a>
      <a
        title='kec9706@gmail.com'
        href='mailto:kec9706@gmail.com'
        target='_blank'
        className='p-1'
      >
        <MailIcon width={22} height={22} />
      </a>
    </div>
  )
}
