import generatePageTitle from 'utils/generatePageTitle'
import Layout from 'widgets/layout'

export default function AboutPage() {
  return <Layout>about</Layout>
}

export function Head() {
  return <title>{generatePageTitle('About')}</title>
}
