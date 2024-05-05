import type { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import { GraphQLError } from 'graphql'
import { PaginationContext } from 'model/utils'
import path from 'path'

export type TagPostsPageContext = PaginationContext & { tag: string }

/*
*
CREATE PAGES
  1. fetch all post meta data
    2. create posts page(pagination)
    3. create home page
    4. create post detail page
  5. fetch all tag meta data
    6. create tag posts page(pagination)
*
*/
export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  // 1. fetch all post meta data
  const allPostMetaDataResult = await graphql<Queries.AllPostMetaDataQuery>(`
    query AllPostMetaData {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { templateKey: { eq: "post" } } }
        limit: 100000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `)

  if (allPostMetaDataResult.errors || !allPostMetaDataResult.data) {
    allPostMetaDataResult.errors.forEach((e: GraphQLError) =>
      console.error(e.toString())
    )
    return Promise.reject(allPostMetaDataResult.errors || 'No data found')
  }

  const allPostMetaData = allPostMetaDataResult.data.allMarkdownRemark.edges

  // 2. create posts page(pagination)
  const postsPerPage = 10
  const totalPosts = allPostMetaData.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  Array.from({ length: totalPages }).forEach((_, i) => {
    createPage<PaginationContext>({
      path: i === 0 ? `/posts` : `/posts/${i + 1}`,
      component: path.resolve('src/templates/posts-page.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPages,
        currentPage: i + 1,
        totalElements: totalPosts,
      },
    })
  })

  // 3. create home page
  createPage<PaginationContext>({
    path: '/',
    component: path.resolve('src/templates/home-page.tsx'),
    context: {
      limit: postsPerPage,
      skip: 0,
      totalPages,
      currentPage: 1,
      totalElements: totalPosts,
    },
  })

  // 4. create post detail page
  allPostMetaData.forEach((edge) => {
    const id = edge.node.id
    createPage({
      path: edge.node.fields!.slug!,
      component: path.resolve('src/templates/post-detail-page.tsx'),
      context: {
        id,
      },
    })
  })

  // 5. fetch all tag meta data
  const allTagMetaDataResult = await graphql<Queries.AllTagMetaDataQuery>(`
    query AllTagMetaData {
      allMarkdownRemark(sort: { frontmatter: { tags: DESC } }) {
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (allTagMetaDataResult.errors || !allTagMetaDataResult.data) {
    allTagMetaDataResult.errors.forEach((e: GraphQLError) =>
      console.error(e.toString())
    )
    return Promise.reject(allTagMetaDataResult.errors || 'No data found')
  }

  const allTagMetaData = allTagMetaDataResult.data.allMarkdownRemark.group

  // 6. create tag posts page(pagination)
  allTagMetaData.forEach(({ tag, totalCount }) => {
    const totalPosts = totalCount
    const totalPages = Math.ceil(totalPosts / postsPerPage)
    Array.from({ length: totalPages }).forEach((_, i) => {
      createPage<TagPostsPageContext>({
        path: i === 0 ? `/tags/${tag}` : `/tags/${tag}/${i + 1}`,
        component: path.resolve('src/templates/tag-posts-page.tsx'),
        context: {
          tag: tag!,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages,
          currentPage: i + 1,
          totalElements: totalPosts,
        },
      })
    })
  })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({
  actions,
}) => {
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      reactRuntime: 'automatic',
    },
  })
}
