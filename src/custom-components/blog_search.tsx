/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

type BlogSearchProps = {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const BlogSearch = ({ searchQuery, setSearchQuery }: BlogSearchProps) => {
  return (
    <div
      sx={{
        mb: 3,
      }}
    >
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          width: `100%`,
          padding: 2,
          fontSize: 2,
          border: `1px solid`,
          borderColor: `gray`,
          borderRadius: `4px`,
          ":focus": {
            outline: `none`,
            borderColor: `primary`,
            boxShadow: (theme) => `0 0 0 2px ${theme.colors.primary}`,
          },
        }}
      />
    </div>
  )
}

export default BlogSearch