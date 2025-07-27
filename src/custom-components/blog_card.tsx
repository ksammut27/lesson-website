/** @jsx jsx */
import { jsx } from "theme-ui"

type BlogCardProps = {
  link: string
  title: string
  children: React.ReactNode
  bg: string
}

const BlogCard = ({ link, title, date, children, bg }: BlogCardProps) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer noopener"
    sx={{
      marginBottom: "4px",
      height: `100%`,
      boxShadow: `lg`,
      display: `flex`,
      flexDirection: `column`,
      position: `relative`,
      textDecoration: `none`,
      px: 3,
      py: 3,
      color: `white`,
      background: bg || `none`,
      transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important`,
      "&:hover": {
        color: `white !important`,
        transform: `translateY(-5px)`,
        boxShadow: `xl`,
      },
    }}
  >
    <h2 sx={{ display: 'flex', margin: 0}}>
        {title}
    </h2>
    <div sx={{ display: 'flex' }}>
        {date}
    </div>
  </a>
)

export default BlogCard
