import PaginationBar from 'components/pagination-bar'
import PostList from 'components/posts/post-list'
import { PostListItemProps } from 'components/posts/post-list-item'
import TagNavigationSidebar from 'components/tag-navigation-sidebar'
import { PaginationContext } from 'model/utils'

interface PostListViewProps {
  posts: PostListItemProps[]
  pageContext: PaginationContext
  title: string
  baseUrl: string
}

export default function ({ posts, pageContext, title, baseUrl }: PostListViewProps) {
  return (
    <>
      <TagNavigationSidebar />
      <div className='center-content'>
        <h1 className='page-title'>
          {title}({pageContext.totalElements})
        </h1>
        <PostList posts={posts} />
        <PaginationBar {...pageContext} baseUrl={baseUrl} />
      </div>
    </>
  )
}
