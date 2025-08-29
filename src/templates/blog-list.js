/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link } from "gatsby"

const PostCard = ({ node }) => {
  if (!node) return null

  const { frontmatter, excerpt } = node
  const image = frontmatter.featuredImage?.childImageSharp?.gatsbyImageData

  return (
    <article
      sx={{
        bg: "background",
        borderRadius: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
          bg: "muted",
          "& img": {
            transform: "scale(1.05)",
          },
          "& div.textContent": {
            color: "primary",
          },
        },
      }}
    >
      {image && (
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
              src={image.images.fallback.src}
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
                transformOrigin: "center center",
                pointerEvents: "none",
              }}
            />
          </div>
        </Link>
      )}
      <div
        className="textContent"
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          color: "text",
          transition: "color 0.3s ease",
        }}
      >
        <Link
          to={frontmatter.slug}
          sx={{
            color: "inherit",
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
            color: "secondary",
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


export default PostCard
