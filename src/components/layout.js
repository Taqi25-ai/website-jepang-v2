/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

import Header from "./header"
import Logo from "./logo"
import Footer from "./footer"
import Theme from "../components/theme"
import Search from "../components/search"

import "../assets/scss/style.scss"
import "./navbar.css"   // ✅ styling navbar tetap dipakai

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
        {/* ✅ Logo */}
        <Logo title={siteTitle} />

        {/* ✅ Navbar (gabungan langsung di Layout.js) */}
        <div sx={layoutStyle.nav}>
          {/* Search versi mobile */}
          <div sx={{ display: ["flex", "flex", "flex", "none"] }}>
            <Search searchIndex={siteSearchIndex.index} />
          </div>

          {/* Menu */}
          <nav className="navbar">
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/manfaat">Manfaat</Link></li>
              <li><Link to="/keunggulan">Keunggulan</Link></li>
              <li><Link to="/layanan">Layanan</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>

        {/* ✅ Bagian kanan (Search, Theme, WA) */}
        <div sx={layoutStyle.appearance}>
          <Search searchIndex={siteSearchIndex.index} />
          <Theme />

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

      {/* ✅ Konten utama */}
      <main className={"container " + (className || "")}>{children}</main>

      {/* ✅ Footer */}
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
