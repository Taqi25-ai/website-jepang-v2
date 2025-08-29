import React from "react"
import { Link } from "gatsby"
import "./footer.css"

const Footer = () => (
  <footer className="footer-curved">
    <p>
      © {new Date().getFullYear()}{" "}
      <Link to="/" className="footer-link">
        STIFIn
      </Link>
      . All rights reserved.
    </p>
  </footer>
)

export default Footer
