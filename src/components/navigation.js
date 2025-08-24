import React from "react"
import { Link } from "gatsby"
import "./navbar.css"

const Navigation = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      {/* <div className="nav-logo">MyLogo</div> */}

      {/* Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
     
        <li><Link to="/manfaat">Manfaat</Link></li>
        <li><Link to="/keunggulan">Keunggulan</Link></li>
        <li><Link to="/layanan">Layanan</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Card di kanan */}
  
    </nav>
  )
}

export default Navigation
