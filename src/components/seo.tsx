function generatePageTitle(prefix?: string) {
  const blogName = 'eunchae.blog'
  return prefix ? `${prefix} | ${blogName}` : blogName
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
}

export default function SEO({
  title,
  description = '웹 프론트엔드 기술 블로그입니다.',
  image = '/images/icon.png',
}: SEOProps) {
  return (
    <>
      <title>{generatePageTitle(title)}</title>
      <meta name='description' content={description} />
      <meta name='image' content={image} />
    </>
  )
}
