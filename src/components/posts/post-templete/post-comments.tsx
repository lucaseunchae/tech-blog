import { useEffect, useRef } from 'react'

export default function PostComments() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')

    const config = {
      src: 'https://giscus.app/client.js',
      repo: 'lucaseunchae/tech-blog-comments',
      'data-repo': 'lucaseunchae/tech-blog-comments',
      'data-repo-id': 'R_kgDOL3ThyQ',
      'data-category': 'Comments',
      'data-category-id': 'DIC_kwDOL3Thyc4Cfc0r',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'light_protanopia',
      'data-lang': 'ko',
      'data-loading': 'lazy',
      crossorigin: 'anonymous',
    }

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    setTimeout(() => {
      ref.current?.append(script)
    }, 300)
  }, [])

  return <div ref={ref} className='pt-10 border-t border-solid' />
}
