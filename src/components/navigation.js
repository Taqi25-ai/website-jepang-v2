import React, { useState } from "react"
import "./navbar.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <a href="/" className="logo">STIFIn</a>

      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <ul className={isOpen ? "show" : ""}>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/manfaat">Manfaat</a></li>
        <li><a href="/keunggulan">Keunggulan</a></li>
        <li><a href="/layanan">Layanan</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <div className="nav-icons">
        <i className="ri-search-line"></i>
        <i className="ri-moon-line"></i>
        <i className="ri-whatsapp-line"></i>
      </div>
    </nav>
  )
}

export default Navbar
