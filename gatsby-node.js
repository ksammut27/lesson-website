const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const postTemplate = path.resolve(`./src/blog_post_template.tsx`)

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

    if (result.errors) {
        reporter.panicOnBuild('Error loading MDX result', result.errors)
    }

    // Create blog post pages.
    const posts = result.data.allMarkdownRemark.nodes
    for (const node of posts) {
        if (node.frontmatter.slug === null || node.frontmatter.slug === undefined) {
            reporter.warn(`Skipping node with id ${node.id} because it has no slug defined in frontmatter.`)
            continue
        }
        createPage({
            // As mentioned above you could also query something else like frontmatter.title above and use a helper function
            path: "blog_post/" + node.frontmatter.slug,
            // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
            component: postTemplate,
            // You can use the values in this context in
            // our page layout componentc
            context: { id: node.id },
        })
    }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blog_posts` }); // Correct basePath
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};