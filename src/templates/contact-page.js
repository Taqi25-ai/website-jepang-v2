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
        {/* --- Info Section --- */}
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
              <a href="mailto:anonim@gmail.com" sx={contactStyles.link}>
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
              <strong>Address:</strong>{" "}
              <a
                href="https://www.google.com/maps/place/Jakarta,+Indonesia"
                target="_blank"
                rel="noopener noreferrer"
                sx={contactStyles.link}
              >
                Jakarta, Indonesia
              </a>
            </p>

            {/* Gambar peta kantor yang bisa diklik */}
            <a
              href="https://maps.app.goo.gl/kuDVybwFCo7GB5fd8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/peta.png"
                alt="Lokasi kantor di Jakarta"
                sx={{
                  mt: 3,
                  borderRadius: 8,
                  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                  maxWidth: "100%",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
            </a>
          </div>
        </div>

        {/* --- Form Section --- */}
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
              rows={5}
              sx={contactStyles.textarea}
            />
          </p>

          <p sx={contactStyles.submitWrapper}>
            <button type="submit" sx={contactStyles.button}>
              Send Message{" "}
              <RiSendPlane2Line sx={{ ml: 2, verticalAlign: "middle" }} />
            </button>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Contact

// ===== Styles =====
const contactStyles = {
  contactPage: {
    bg: "#f8f8f8",
    minHeight: "100vh",
    py: [5, 6],
    px: 3,
    fontFamily: "'Poppins', sans-serif",
  },
  container: {
    maxWidth: 800,
    mx: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  infoSection: {
    bg: "#BC002D",
    p: [3, 4],
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    color: "#fff",
  },
  title: {
    fontSize: [4, 5],
    fontWeight: "800",
    mb: 2,
    color: "#fff",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 1,
    lineHeight: 1.6,
    mb: 3,
    color: "#fff",
  },
  contactDetails: {
    fontSize: 1,
    color: "#fff",
    lineHeight: 1.5,
    p: { mb: 2 },
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    "&:hover": {
      color: "#000",
      textDecoration: "underline",
    },
  },
  form: {
    bg: "#BC002D",
    p: [4, 5],
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  field: {
    mb: 3,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    mb: 1,
    fontWeight: "700",
    fontSize: "16px",
    color: "#ffffff !important",
    letterSpacing: "0.02em",
  },
  input: {
    border: "1.5px solid #fff",
    borderRadius: 6,
    px: 2,
    py: 2,
    fontSize: 1,
    fontWeight: "500",
    backgroundColor: "#fff",
    "&::placeholder": {
      color: "#999",
      fontStyle: "italic",
    },
    "&:focus": {
      borderColor: "#222",
      outline: "none",
      boxShadow: "0 0 5px #222",
    },
  },
  textarea: {
    border: "1.5px solid #fff",
    borderRadius: 6,
    px: 2,
    py: 2,
    fontSize: 1,
    fontWeight: "500",
    resize: "vertical",
    minHeight: 100,
    backgroundColor: "#fff",
    "&::placeholder": {
      color: "#999",
      fontStyle: "italic",
    },
    "&:focus": {
      borderColor: "#222",
      outline: "none",
      boxShadow: "0 0 5px #222",
    },
  },
  submitWrapper: {
    textAlign: "right",
  },
  button: {
    bg: "#fff",
    color: "#BC002D",
    fontWeight: "800",
    fontSize: 2,
    px: 4,
    py: 2,
    borderRadius: 8,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    boxShadow: "0 4px 10px rgba(75, 62, 62, 0.15)",
    transition: "all 0.3s ease",
    border: "none",
    "&:hover, &:focus": {
      bg: "#000",
      color: "#FFD529",
      boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
      outline: "none",
      transform: "translateY(-1px)",
    },
    svg: {
      ml: 2,
      fontSize: 22,
    },
  },
}
