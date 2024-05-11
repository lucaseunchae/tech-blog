import throttle from 'lodash.throttle'
import { ReactNode, useEffect } from 'react'
import isMobileDevice from 'utils/isMobileDevice'

import Footer from './footer'
import Header from './header'

export default function ({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (isMobileDevice()) return

    let previousScrollY = window.scrollY

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY
      const header = document.querySelector('header')

      if (currentScrollY > previousScrollY) {
        header?.classList.add('translate-y-[-100%]')
      } else {
        header?.classList.remove('translate-y-[-100%]')
      }

      previousScrollY = currentScrollY
    }, 200)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className='flex flex-col min-h-screen pt-[--header-height] md:pt-[--md-header-height] text-slate-950 transition-all'>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  )
}

export const Head = () => {
  return <title>eunchae.blog</title>
}
