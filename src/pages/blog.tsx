import * as React from "react"
import { HeadFC, Link, PageProps } from "gatsby"
import { Parallax } from "@react-spring/parallax"
import Layout from "../@lekoarts/gatsby-theme-cara/components/layout"
import Divider from "@lekoarts/gatsby-theme-cara/src/elements/divider"
import { UpDown, UpDownWide } from "@lekoarts/gatsby-theme-cara/src/styles/animations"
import Svg from "../@lekoarts/gatsby-theme-cara/components/svg"
import Seo from "../@lekoarts/gatsby-theme-cara/components/seo"
import Content from "@lekoarts/gatsby-theme-cara/src/elements/content"
import { graphql } from "gatsby"
import Projects from "../@lekoarts/gatsby-theme-cara/components/projects"
import BlogSearch from "../custom-components/blog_search"
import { useFlexSearch } from 'react-use-flexsearch'
import { useState } from "react"
import BlogCard from "../custom-components/blog_card"

const Blog = ({ data }) => {
  const { localSearchPages: { index, store }, allMarkdownRemark: { nodes } } = data;
  const [searchQuery, setSearchQuery] = useState('');
  const results = useFlexSearch(searchQuery, index, store);
  const posts = results.length > 0 ? results : nodes;

  return (
    <Layout>
      <Parallax pages={2}>
        <div>
          <Divider speed={0.2} offset={0} factor={1}>
            <UpDown>
              <Svg icon="triangle" hiddenMobile width={48} stroke color="icon_orange" left="10%" top="20%" />
              <Svg icon="hexa" width={48} stroke color="icon_red" left="60%" top="70%" />
              <Svg icon="box" width={6} color="icon_darker" left="60%" top="15%" />
            </UpDown>
            <UpDownWide>
              <Svg icon="triangle" width={12} stroke color="icon_brightest" left="90%" top="50%" />
              <Svg icon="circle" width={16} color="icon_darker" left="70%" top="90%" />
              <Svg icon="triangle" width={16} stroke color="icon_darkest" left="30%" top="65%" />
              <Svg icon="circle" width={6} color="icon_darkest" left="75%" top="10%" />
            </UpDownWide>
            <Svg icon="circle" hiddenMobile width={24} color="icon_darker" left="5%" top="70%" />
            <Svg icon="circle" width={6} color="icon_darkest" left="4%" top="20%" />
            <Svg icon="circle" width={12} color="icon_darkest" left="50%" top="60%" />
            <Svg icon="triangle" width={8} stroke color="icon_darker" left="25%" top="5%" />
            <Svg icon="circle" width={64} color="icon_green" left="95%" top="5%" />
            <Svg icon="box" hiddenMobile width={64} color="icon_purple" left="5%" top="90%" />
            <Svg icon="box" width={6} color="icon_darkest" left="10%" top="10%" />
            <Svg icon="box" width={12} color="icon_darkest" left="40%" top="30%" />
            <Svg icon="hexa" width={16} stroke color="icon_darker" left="10%" top="50%" />
            <Svg icon="hexa" width={8} stroke color="icon_darker" left="80%" top="70%" />
          </Divider>
          <Content sx={{ variant: `texts.bigger` }} speed={0.4} offset={0} factor={1}>
            <h1>Blog</h1>
            <BlogSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <div
              sx={{
                display: `grid`,
                gridGap: [4, 4, 4, 5],
                gridTemplateColumns: [`1fr`, `1fr`, `repeat(2, 1fr)`],
              }}
            >
              {posts.map((post) => {
                console.log(post)
                if (post.slug === undefined || post.slug === null) {
                  return null; // Skip posts without a slug
                }
                return (<BlogCard
                  key={post.id}
                  link={"/blog_post/"+post.slug}
                  title={post.title}
                  date={post.date}
                  bg="linear-gradient(to right, #D4145A 0%, #FBB03B 100%)"
                />)
              })}
            </div>
          </Content>
        </div>
      </Parallax>
    </Layout>
  )
}

export default Blog

export const Head: HeadFC = () => <Seo title="Blog" />

export const pageQuery = graphql`
   query {
     localSearchPages {
       index
       store
     }
     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
       nodes {
         id
         frontmatter {
           date(formatString: "MMMM DD, YYYY")
           title
           slug
         }
       }
     }
   }
 `
