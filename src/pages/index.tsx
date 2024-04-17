import Layout from 'components/layout'
import genPageTitle from 'utils/genPageTitle'

export default function IndexPage() {
  return (
    <Layout>
      <div className='relative flex justify-center items-center w-full sm:h-96 h-40'>
        <img
          src='images/banner-image.jpg'
          className='w-full h-full object-cover'
        />
      </div>
    </Layout>
  )
}

export function Head() {
  return <title>{genPageTitle()}</title>
}
