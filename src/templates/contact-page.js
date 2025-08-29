/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Contact = ({ data }) => {
  const { markdownRemark, site } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout className="contact-page" sx={contactStyles.contactPage}>
      <Seo
        title={frontmatter.title}
        description={`${frontmatter.title} - ${site.siteMetadata.title}`}
      />
      <div sx={contactStyles.container}>
        <div sx={contactStyles.infoSection}>
          <h1 sx={contactStyles.title}>{frontmatter.title}</h1>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
            sx={contactStyles.description}
          />
          <div sx={contactStyles.contactDetails}>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:satrioareta55@gmail.com" sx={contactStyles.link}>
                anonim@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+628123456789" sx={contactStyles.link}>
                +62 812-3456-789
              </a>
            </p>
            <p>
              <strong>Address:</strong> Jakarta, Indonesia
            </p>
          </div>
        </div>
        <form
          className="contact-form"
          action="/thanks"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          sx={contactStyles.form}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p sx={contactStyles.field}>
            <label htmlFor="name" sx={contactStyles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your full name"
              required
              sx={contactStyles.input}
            />
          </p>
          <p sx={contactStyles.field}>
            <label htmlFor="email" sx={contactStyles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              sx={contactStyles.input}
            />
          </p>
          <p sx={contactStyles.field}>
            <label htmlFor="subject" sx={contactStyles.label}>
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Subject of your message"
              required
              sx={contactStyles.input}
            />
          </p>
          <p sx={contactStyles.field}>
            <label htmlFor="message" sx={contactStyles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              required
              rows={6}
              sx={contactStyles.textarea}
            />
          </p>
          <p sx={contactStyles.submitWrapper}>
            <button type="submit" sx={contactStyles.button}>
              Send Message <RiSendPlane2Line sx={{ ml: 2, verticalAlign: "middle" }} />
            </button>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Contact

const contactStyles = {
  contactPage: {
    bg: "#FFD529",
    minHeight: "100vh",
    py: [6, 7],
    px: 3,
    fontFamily: "'Poppins', sans-serif",
    color: "#222",
  },
  container: {
    maxWidth: 960,
    mx: "auto",
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr 1fr"],
    gap: 6,
    alignItems: "start",
  },
  infoSection: {
    bg: "rgba(255, 255, 255, 0.85)",
    p: [4, 5],
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: [5, 6],
    fontWeight: "900",
    mb: 3,
    color: "#222",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 2,
    lineHeight: 1.7,
    mb: 4,
    color: "#444",
  },
  contactDetails: {
    fontSize: 2,
    color: "#333",
    lineHeight: 1.6,
    p: {
      mb: 2,
    },
  },
  link: {
    color: "#222",
    textDecoration: "none",
    fontWeight: "600",
    "&:hover": {
      color: "#000",
      textDecoration: "underline",
    },
  },
  form: {
    bg: "rgba(255, 255, 255, 0.95)",
    p: [5, 6],
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
  },
  field: {
    mb: 4,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    mb: 2,
    fontWeight: "700",
    fontSize: 1,
    color: "#222",
    letterSpacing: "0.03em",
  },
  input: {
    border: "2px solid #ccc",
    borderRadius: 8,
    px: 3,
    py: 3,
    fontSize: 2,
    fontWeight: "500",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
    "&::placeholder": {
      color: "#999",
      fontStyle: "italic",
    },
    "&:focus": {
      borderColor: "#222",
      outline: "none",
      boxShadow: "0 0 8px #222",
      backgroundColor: "#fff",
    },
  },
  textarea: {
    border: "2px solid #ccc",
    borderRadius: 8,
    px: 3,
    py: 3,
    fontSize: 2,
    fontWeight: "500",
    resize: "vertical",
    minHeight: 140,
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
    "&::placeholder": {
      color: "#999",
      fontStyle: "italic",
    },
    "&:focus": {
      borderColor: "#222",
      outline: "none",
      boxShadow: "0 0 8px #222",
      backgroundColor: "#fff",
    },
  },
  submitWrapper: {
    textAlign: "right",
  },
  button: {
    bg: "#222",
    color: "#FFD529",
    fontWeight: "900",
    fontSize: 3,
    px: 6,
    py: 3,
    borderRadius: 10,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    border: "none",
    "&:hover, &:focus": {
      bg: "#000",
      color: "#FFD529",
      boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
      outline: "none",
      transform: "translateY(-2px)",
    },
    svg: {
      ml: 3,
      fontSize: 28,
    },
  },
}
