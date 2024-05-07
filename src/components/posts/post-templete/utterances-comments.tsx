import { useEffect, useRef } from 'react'

export default function () {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')

    const config = {
      src: 'https://utteranc.es/client.js',
      repo: 'lucaseunchae/tech-blog-comments',
      'issue-term': 'title',
      theme: 'github-light',
      crossOrigin: 'anonymous',
      async: 'true',
    }

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    setTimeout(() => {
      ref.current?.append(script)
    }, 300)
  }, [])

  return (
    <div className='pt-5 border-t border-solid'>
      <span className='text-xl font-semibold text-gray-600'>댓글 남기기</span>
      <div ref={ref} className='mt-5' />
    </div>
  )
}
