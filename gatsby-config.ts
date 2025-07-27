import type { GatsbyConfig, PluginRef } from "gatsby"
import "dotenv/config"

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const config: GatsbyConfig = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-cara/gatsby-config.mjs
    siteTitle: `Cara`,
    siteTitleAlt: `Cara - Gatsby Starter Portfolio`,
    siteHeadline: `Cara - Gatsby Theme from @lekoarts`,
    siteUrl: `https://cara.lekoarts.de`,
    siteDescription: `Playful and Colorful One-Page portfolio featuring Parallax effects and animations`,
    siteImage: `/banner.jpg`,
    siteLanguage: `en`,
    author: `@lekoarts_de`,
  },
  trailingSlash: `always`,
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
       resolve: `gatsby-plugin-local-search`,
       options: {
         name: `pages`,
         engine: `flexsearch`,
         engineOptions: {
           encode: "icase",
           tokenize: "forward",
           async: false,
         },
         query: `
           {
             allMarkdownRemark {
               nodes {
                 id
                 frontmatter {
                   title
                   date
                   slug
                 }
                 rawMarkdownBody
               }
             }
           }
         `,
         ref: `id`,
         index: [`title`, `rawMarkdownBody`],
         store: [`id`, `slug`, `title`, `date`],
         normalizer: ({ data }) =>
           data.allMarkdownRemark.nodes.map(node => ({
             id: node.id,
             slug: node.frontmatter.slug,
             title: node.frontmatter.title,
             date: node.frontmatter.date,
             rawMarkdownBody: node.rawMarkdownBody,
           })),
       },
     },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // REPLACE `gatsby-remark-mathjax` config with `gatsby-remark-katex`
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options here if needed.
              // 'strict: `ignore`' is useful for allowing some non-standard LaTeX
              // that KaTeX might otherwise flag as an error.
              strict: `ignore`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog_posts`,
        path: `${__dirname}/src/blog_posts`,
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: `@lekoarts/gatsby-theme-cara`,
      // See the theme's README for all available options
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cara - @lekoarts/gatsby-theme-cara`,
        short_name: `Cara`,
        description: `Playful and Colorful One-Page portfolio featuring Parallax effects and animations`,
        start_url: `/`,
        background_color: `#141821`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#f6ad55`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    // You can remove this plugin if you don't need it
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
}

export default config
