import PaginationBar from 'components/pagination-bar'
import PostList from 'components/posts/post-list'
import { PostListItemProps } from 'components/posts/post-list-item'
import TagNavigation from 'components/tags/tag-navigation'
import { PaginationContext } from 'model/utils'

interface PostListViewProps {
  posts: PostListItemProps[]
  pageContext: PaginationContext
  title: string
  baseUrl: string
}

export default function PostListView({
  posts,
  pageContext,
  title,
  baseUrl,
}: PostListViewProps) {
  return (
    <>
      <TagNavigation />
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
