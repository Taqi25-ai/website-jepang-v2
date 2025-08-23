/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Theme from "./theme"

const Navigation = () => {
  return (
    <nav
      className="site-navigation"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        color: "#fff",
      }}
    >
      <Link to="/" sx={{ color: "inherit", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/about" sx={{ color: "inherit", textDecoration: "none" }}>
        About
      </Link>
      <Link to="/blog" sx={{ color: "inherit", textDecoration: "none" }}>
        Blog
      </Link>
      <Link to="/contact" sx={{ color: "inherit", textDecoration: "none" }}>
        Contact
      </Link>

      {/* Toggle Dark/Light Mode */}
      <Theme />
    </nav>
  )
}

export default Navigation
