import type { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import { GraphQLError } from 'graphql'
import { PaginationContext } from 'model/utils'
import path from 'path'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  const result = await graphql<Queries.AllPostMetaDataQuery>(`
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

  if (result.errors || !result.data) {
    result.errors.forEach((e: GraphQLError) => console.error(e.toString()))
    return Promise.reject(result.errors || 'No data found')
  }

  const posts = result.data.allMarkdownRemark.edges

  // create posts page(pagination)
  const postsPerPage = 10
  const totalPosts = posts.length
  const totalPage = Math.ceil(totalPosts / postsPerPage)
  Array.from({ length: totalPage }).forEach((_, i) => {
    createPage<PaginationContext>({
      path: i === 0 ? `/posts` : `/posts/${i + 1}`,
      component: path.resolve('src/templates/posts-page.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPage,
        currentPage: i + 1,
        totalElements: totalPosts
      },
    })
  })

  // create home page
  createPage<PaginationContext>({
    path: '/',
    component: path.resolve('src/templates/home-page.tsx'),
    context: {
      limit: postsPerPage,
      skip: 0,
      totalPage,
      currentPage: 1,
      totalElements: totalPosts
    },
  })

  // create post detail page
  posts.forEach((edge) => {
    const id = edge.node.id
    createPage({
      path: edge.node.fields!.slug!,
      component: path.resolve('src/templates/post-detail-page.tsx'),
      context: {
        id,
      },
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
