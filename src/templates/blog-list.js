/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PostCard = ({ data }) => {
  const { frontmatter, excerpt } = data
  const image = frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
  const fallbackImage = frontmatter.featuredImage?.publicURL

  return (
    <article
      sx={{
        bg: "background",
        borderRadius: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {(image || fallbackImage) && (
        <Link to={frontmatter.slug} sx={{ overflow: "hidden", display: "block" }}>
          <div
            sx={{
              position: "relative",
              height: 0,
              paddingBottom: "75%", // 4:3 ratio
              overflow: "hidden",
            }}
          >
            <img
              src={image?.images?.fallback?.src || fallbackImage}
              alt={frontmatter.title}
              loading="lazy"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </div>
        </Link>
      )}

      <div sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Link
          to={frontmatter.slug}
          sx={{
            color: "text",
            fontWeight: "bold",
            fontSize: 3,
            mb: 2,
            textDecoration: "none",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              width: "0%",
              height: "2px",
              bottom: 0,
              left: 0,
              bg: "primary",
              transition: "width 0.3s ease",
            },
            "&:hover::after": {
              width: "100%",
            },
          }}
        >
          {frontmatter.title}
        </Link>
        <p
          sx={{
            color: "muted",
            fontSize: 1,
            lineHeight: "body",
            flexGrow: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {excerpt}
        </p>
        <time
          sx={{
            mt: 3,
            fontSize: 0,
            color: "#FFD529",
            fontWeight: "600",
            alignSelf: "flex-start",
          }}
        >
          {frontmatter.date}
        </time>
      </div>
    </article>
  )
}

const Pagination = ({
  isFirst,
  isLast,
  prevPage,
  nextPage,
  numPages,
  currentPage,
  blogSlug,
}) => (
  <nav
    sx={{
      mt: 6,
      mb: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 3,
      userSelect: "none",
    }}
    aria-label="Pagination Navigation"
  >
    <Link
      to={isFirst ? "#" : prevPage}
      sx={{
        pointerEvents: isFirst ? "none" : "auto",
        color: isFirst ? "#FFD529" : "primary",
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 2,
        textDecoration: "none",
        borderRadius: "50%",
        width: 40,
        height: 40,
        justifyContent: "center",
        bg: isFirst ? "background" : "primary",
        boxShadow: isFirst ? "none" : "0 2px 8px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          bg: isFirst ? "background" : "secondary",
          color: isFirst ? "#FFD529" : "background",
        },
      }}
      aria-disabled={isFirst}
      rel="prev"
    >
      <RiArrowLeftLine />
    </Link>

    {Array.from({ length: numPages }, (_, i) => {
      const pageNum = i + 1
      const isActive = currentPage === pageNum
      const linkTo = pageNum === 1 ? blogSlug : `${blogSlug}${pageNum}`

      return (
        <Link
          key={`pagination-number${pageNum}`}
          to={linkTo}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "background" : "primary",
            bg: isActive ? "primary" : "transparent",
            boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
            textDecoration: "none",
            fontSize: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              bg: isActive ? "primary" : "#FFD529",
              color: isActive ? "background" : "text",
            },
          }}
          aria-current={isActive ? "page" : undefined}
        >
          {pageNum}
        </Link>
      )
    })}

    <Link
      to={isLast ? "#" : nextPage}
      sx={{
        pointerEvents: isLast ? "none" : "auto",
        color: isLast ? "#FFD529" : "primary",
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 2,
        textDecoration: "none",
        borderRadius: "50%",
        width: 40,
        height: 40,
        justifyContent: "center",
        bg: isLast ? "background" : "primary",
        boxShadow: isLast ? "none" : "0 2px 8px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          bg: isLast ? "background" : "secondary",
          color: isLast ? "#FFD529" : "background",
        },
      }}
      aria-disabled={isLast}
      rel="next"
    >
      <RiArrowRightLine />
    </Link>
  </nav>
)

const BlogIndex = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const blogSlug = "/blog/"
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? blogSlug : `${blogSlug}${currentPage - 1}`
  const nextPage = `${blogSlug}${currentPage + 1}`

  const posts = data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)

  return (
    <Layout className="blog-page">
      <Seo
        title={`Blog — Page ${currentPage} of ${numPages}`}
        description={`Stackrole base blog page ${currentPage} of ${numPages}`}
      />
      <h1
        sx={{
          fontSize: [5, 6],
          fontWeight: "heading",
          textAlign: "center",
          mb: 5,
          mt: 4,
          color: "#FFD529",
        }}
      >
        Blog
      </h1>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: ["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"],
          gap: 5,
          px: [3, 4],
          mb: 6,
        }}
      >
        {posts}
      </div>
           <Pagination
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
        numPages={numPages}
        currentPage={currentPage}
        blogSlug={blogSlug}
      />
    </Layout>
  )
}

export default BlogIndex

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 345, height: 260)
              }
              publicURL
            }
          }
        }
      }
    }
  }
`

