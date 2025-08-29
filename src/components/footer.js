import React from "react"
import { Link } from "gatsby"
import { RiHeart2Line } from "react-icons/ri"
import "./footer.css"

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-container">
      <p className="footer-text">
        © {new Date().getFullYear()} <Link to="/" className="footer-link">STIFIn</Link> 
        <span className="footer-icon"><RiHeart2Line /></span> All rights reserved.
      </p>
    </div>
  </footer>
)

export default Footer
