import TagNavigationButtons from './tag-navigation-buttons'
import TagNavigationSidebar from './tag-navigation-sidebar'

export default function TagNavigation() {
  return (
    <>
      <TagNavigationSidebar className='hidden xl:block' />
      <TagNavigationButtons className='block xl:hidden' />
    </>
  )
}
