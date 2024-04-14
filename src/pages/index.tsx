import Layout from 'components/layout'
import genPageTitle from 'utils/genPageTitle'

export default function IndexPage() {
  return (
    <Layout>
      <article className='center-content py-24 text-center break-keep'>
        <h1 className='text-4xl font-bold mb-6'>안녕하세요. 김은채입니다.</h1>
      </article>
    </Layout>
  )
}

export function Head() {
  return <title>{genPageTitle()}</title>
}
