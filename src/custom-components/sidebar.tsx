// src/components/Sidebar/Sidebar.js
import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Box, useColorMode } from "theme-ui";
import { jsx } from "theme-ui"

interface SidebarProps {
    isVisible: boolean;
}

function Sidebar({ isVisible }: SidebarProps) {
    // You'll fetch your page data here
    const data = useStaticQuery(graphql`
        query {
            allSitePage {
                nodes {
                    path
                }
            }
        }
    `);
    console.log("All Site Pages:", data.allSitePage.nodes.map(node => node.path)); // <-- Add this!

    // Filter out utility pages (like 404, /dev-404-page, etc.) and Cara's sections
    const validPages = data.allSitePage.nodes.filter(node => {
        let UtilityPages = ['/404', '/dev-404-page', '/404.html', '/blog_post'];
        let isUtilityPage = false;
        for (let page of UtilityPages) {
            if (node.path.includes(page)) {
                isUtilityPage = true;
                break;
            }
        }
        const isCaraSection = ["/intro", "/projects", "/about", "/contact", "/"].includes(node.path); // Adjust as needed
        return !isUtilityPage && !isCaraSection;
    });

    return (
        <Box
            sx={{
                width: '250px', // Adjust width as needed
                padding: '20px',
                height: '100vh',
                position: 'fixed', // Or 'sticky' depending on desired behavior
                top: 0,
                left: 0,
                overflowY: 'auto',
                // this uses the value from `theme.space[4]`
                // these use values from `theme.colors`
                color: "text",
                backgroundColor: "background_transparent",
                // display: [isVisible ? 'block' : 'none'],
                transform: [isVisible ? 'translateX(0)' : 'translateX(-100%)'],
                transition: 'transform 0.1s ease-in'
            }}
        >
            <Box as="div" sx={{ marginTop: 40 }}>
                <Box as="h1">Pages</Box>
                <Box as="nav">
                    <Box as="ul" sx={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {validPages.map((page) => (
                            <li key={page.path}>
                                <Link to={page.path}>
                                    {
                                        // Attempt to derive a title. You'll likely need to customize this
                                        // if you have specific titles in your page data or frontmatter.
                                        page.context?.title ||
                                        page.path
                                            .replace(/\//g, "")
                                            .replace(/-/g, " ")
                                            .split(" ")
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ") ||
                                        page.path}
                                </Link>
                            </li>
                        ))}
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}

export default Sidebar