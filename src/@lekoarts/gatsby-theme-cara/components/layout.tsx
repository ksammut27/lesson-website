import * as React from "react"
import { get } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"
import { Global } from "@emotion/react"
import MdxComponents from "./mdx-components"
import Sidebar from "../../../custom-components/sidebar"
import { Box, useColorMode } from "theme-ui";
import { BiArrowFromLeft, BiArrowToLeft } from 'react-icons/bi';

type LayoutProps = { children: React.ReactNode; className?: string; isSidebarVisible?: boolean; toggleSidebar?: () => void }

const Layout = ({ children, className = `` }: LayoutProps) => {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
  const toggleSidebar = () => { // <--- Toggle function
    setIsSidebarVisible(!isSidebarVisible);
  };
  const [colorMode, setColorMode] = useColorMode<"light" | "dark">()
  const isDark = colorMode === `dark`
  return <>
    <React.Fragment>
    <Global
      styles={(t) => ({
        "*": {
          boxSizing: `inherit`,
          "&:before": {
            boxSizing: `inherit`,
          },
          "&:after": {
            boxSizing: `inherit`,
          },
        },
        "[hidden]": {
          display: `none`,
        },
        "::selection": {
          backgroundColor: get(t, `colors.primary`),
          color: get(t, `colors.background`),
        },
      })}
    />
    <MDXProvider components={MdxComponents}>
      <main className={className}>{children}</main>
    </MDXProvider>
    <Box as="button"
        onClick={toggleSidebar}
        sx={{
          position: 'fixed', // Position the button
          top: 3,            // Spacing from top
          left: 20,           // Spacing from left
          zIndex: 1001,      // Ensure it's above sidebar
          display: ['flex'], // Show on mobile, hide on desktop breakpoints
          backgroundColor: 'background_inv', // Use your theme's primary color
          color: 'primary_inv', // Text color for the button
          // padding: -1, // Padding
          p: ['10px', '10px', '10px', '10px'], // Responsive padding
          borderRadius: '0px', // Rounded corners
          border: 'none',
          fontSize: 24, // Font size
          alignContent: 'center',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          }
        }}
      >
        {/* You can use icons here for a cleaner look */}
        {/* {isSidebarVisible ? 'Close Menu' : 'Open Menu'} */}
        {isSidebarVisible ? <BiArrowToLeft /> : <BiArrowFromLeft />}
        {/* {isSidebarVisible ? <FaTimes /> : <FaBars />} */} {/* If using react-icons */}
    </Box>
    <Box as="button"
        onClick={() => {
          const next = isDark ? `light` : `dark`
          setColorMode(next)
          document.documentElement.classList.value = `theme-ui-${next}`
        }}
        sx={{
          width: '160px', // Adjust width as needed
          position: 'fixed', // Position the button
          top: 3,            // Spacing from top
          left: 65,           // Spacing from left
          zIndex: 1001,      // Ensure it's above sidebar
          display: ['flex'], // Show on mobile, hide on desktop breakpoints
          backgroundColor: 'background_inv', // Use your theme's primary color
          color: 'primary_inv', // Text color for the button
          // padding: -1, // Padding
          p: ['10px', '10px', '10px', '10px'], // Responsive padding
          borderRadius: '0px', // Rounded corners
          border: 'none',
          fontSize: 20, // Font size
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          }
        }}
      >
        {/* You can use icons here for a cleaner look */}
        {/* {isSidebarVisible ? 'Close Menu' : 'Open Menu'} */}
        {isDark ? <Box>Dark</Box> : <Box>Light</Box>}
        {/* {isSidebarVisible ? <FaTimes /> : <FaBars />} */} {/* If using react-icons */}
    </Box>
    <Sidebar isVisible={isSidebarVisible} />
  </React.Fragment>
  </>
};

export default Layout
