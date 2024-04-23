import { ReactNode } from 'react'

import Header from './header'

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className='pt-[--header-height] md:pt-[--md-header-height] text-slate-950 transition-all'>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export const Head = () => {
  return <title>eunchae.blog</title>
}
