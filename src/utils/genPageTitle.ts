export default function (prefix?: string | null | undefined) {
  const siteTtile = 'eunchae.blog'
  return prefix ? prefix + ' | ' + siteTtile : siteTtile
}
