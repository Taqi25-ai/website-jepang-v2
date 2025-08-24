/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

import Header from "./header"
import Logo from "./logo"
import Navigation from "./navigation"
import Footer from "./footer"
import Theme from "../components/theme"
import Search from "../components/search"

import "../assets/scss/style.scss"

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
    siteSearchIndex {
      index
    }
  }
`

const Layout = ({ children, className }) => {
  const { site, siteSearchIndex } = useStaticQuery(query)
  const { siteTitle } = site.siteMetadata

  return (
    <div className="primary-container">
      <Header>
        <Logo title={siteTitle} />
        <div sx={layoutStyle.nav}>
          <div sx={{ display: ["flex", "flex", "flex", "none"] }}>
            <Search searchIndex={siteSearchIndex.index} />
          </div>
          <Navigation />
        </div>

        <div sx={layoutStyle.appearance}>
          <Search searchIndex={siteSearchIndex.index} />
          <Theme />

          {/* ✅ WhatsApp Icon */}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            sx={layoutStyle.whatsapp}
            aria-label="Chat via WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
      </Header>

      <main className={"container " + (className || "")}>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout

const layoutStyle = {
  appearance: {
    display: ["none", "none", "none", "flex"],
    alignItems: "center",
    gap: 4,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  whatsapp: {
    color: "#25D366",
    fontSize: "1.8rem",
    marginLeft: "1rem",
    transition: "opacity 0.3s ease",
    ":hover": {
      opacity: 0.8,
    },
  },
}
