import Layout from 'components/widgets/layout'
import generatePageTitle from 'utils/generatePageTitle'

export default function AboutPage() {
  return <Layout>about</Layout>
}

export function Head() {
  return <title>{generatePageTitle('About')}</title>
}
