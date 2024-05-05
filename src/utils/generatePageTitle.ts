export default function (prefix?: string) {
  const blogName = 'eunchae.blog'
  return prefix ? `${prefix} | ${blogName}` : blogName
}
