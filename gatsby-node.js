const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = require.resolve(`./src/templates/blog-post-contentful.js`)
  const result = await graphql(
    `
      {
       allContentfulBlogPost {
         edges {
           node{
             id
             slug
             title
             description{
               description
             }
           }
         }
       }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allContentfulBlogPost.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })
}

