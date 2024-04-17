import Layout from 'components/layout'
import genPageTitle from 'utils/genPageTitle'

export default function AboutPage() {
  return <Layout>about</Layout>
}

export function Head() {
  return <title>{genPageTitle('About')}</title>
}
