/** @jsx jsx */
import { jsx } from "theme-ui";
import { keyframes } from "@emotion/react";
import { graphql } from "gatsby";
import {
  RiSendPlane2Line,
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
} from "react-icons/ri";

import Layout from "../components/layout";
import Seo from "../components/seo";

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
`;

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

const Contact = ({ data }) => {
  const { markdownRemark, site } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout sx={contactStyles.contactPage}>
      <Seo
        title={frontmatter.title}
        description={`${frontmatter.title} - ${site.siteMetadata.title}`}
      />
      <div sx={contactStyles.container}>
        <section sx={contactStyles.infoSection}>
          <h1 sx={contactStyles.title}>{frontmatter.title}</h1>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
            sx={contactStyles.description}
          />
          <div sx={contactStyles.contactDetails}>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:satrioareta55@gmail.com"
                sx={contactStyles.link}
              >
                satrioareta55@gmail.com
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
          <div sx={contactStyles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={contactStyles.socialLink}
            >
              <RiFacebookFill />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={contactStyles.socialLink}
            >
              <RiInstagramFill />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={contactStyles.socialLink}
            >
              <RiLinkedinBoxFill />
            </a>
          </div>
        </section>
        <form
          className="contact-form"
          action="/thanks"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          sx={contactStyles.form}
          noValidate
        >
          <input type="hidden" name="form-name" value="contact" />
          {["name", "email", "subject"].map((field) => (
            <div key={field} sx={contactStyles.inputGroup}>
              <input
                id={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                required
                placeholder=" "
                sx={contactStyles.input}
              />
              <label htmlFor={field} sx={contactStyles.label}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
          <div sx={contactStyles.inputGroup}>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder=" "
              sx={contactStyles.textarea}
            />
            <label htmlFor="message" sx={contactStyles.label}>
              Message
            </label>
          </div>
          <div sx={contactStyles.submitWrapper}>
            <button
              type="submit"
              sx={contactStyles.button}
              aria-label="Send Message"
            >
              Send Message <RiSendPlane2Line />
              <span sx={contactStyles.ripple} />
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;

const contactStyles = {
  contactPage: {
    bg: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    minHeight: "100vh",
    py: [6, 8],
    px: 4,
    fontFamily: "'Poppins', sans-serif",
    color: "#f8f8f8",
    overflowX: "hidden",
    lineHeight: 1.5,
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
    bg: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: 20,
    p: [4, 6],
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
    color: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: [5, 6],
    fontWeight: "900",
    mb: 3,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#fff",
    textShadow: "0 2px 5px rgba(0,0,0,0.4)",
  },
  description: {
    fontSize: 2,
    mb: 4,
    color: "#ddd",
  },
  contactDetails: {
    fontSize: 2,
    mb: 4,
    p: {
      mb: 3,
      strong: {
        color: "#fff",
      },
    },
  },
  link: {
    color: "#fff",
    fontWeight: "700",
    textDecoration: "underline",
    transition: "color 0.3s ease",
    "&:hover, &:focus": {
      color: "#FFD529",
      outline: "none",
    },
  },
  socialIcons: {
    display: "flex",
    gap: 4,
    mt: "auto",
  },
  socialLink: {
    color: "#fff",
    fontSize: 30,
    transition: "color 0.3s ease, transform 0.3s ease",
    "&:hover, &:focus": {
      color: "#FFD529",
      transform: "scale(1.3)",
      outline: "none",
    },
  },
  form: {
    bg: "rgba(255, 255, 255, 0.13)",
    backdropFilter: "blur(12px)",
    borderRadius: 20,
    p: [6, 7],
    boxShadow: "0 16px 50px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    position: "relative",
    mb: 5,
    "& input, & textarea": {
      width: "100%",
      border: "none",
      borderBottom: "2px solid rgba(255,255,255,0.4)",
      bg: "transparent",
      color: "#fff",
      fontSize: 2,
      fontWeight: "600",
      px: 0,
      py: 3,
      resize: "none",
      transition: "border-color 0.4s ease",
      "&::placeholder": {
        color: "transparent",
      },
      "&:focus": {
        outline: "none",
        borderBottomColor: "#FFD529",
        boxShadow: "0 2px 8px rgba(255,213,41,0.7)",
      },
      "&:focus + label, &:not(:placeholder-shown) + label": {
        top: 0,
        fontSize: 1,
        color: "#FFD529",
        fontWeight: "700",
        letterSpacing: "0.06em",
        textShadow: "0 0 6px #FFD529",
      },
    },
    label: {
      position: "absolute",
      left: 0,
      top: "18px",
      color: "rgba(255,255,255,0.6)",
      fontSize: 2,
      fontWeight: "500",
      pointerEvents: "none",
      userSelect: "none",
      transition: "all 0.3s ease",
    },
  },
  input: {},
  textarea: {
    minHeight: 140,
  },
  submitWrapper: {
    textAlign: "right",
  },
  button: {
    position: "relative",
    overflow: "hidden",
    bg: "#FFD529",
    color: "#222",
    fontWeight: "900",
    fontSize: 3,
    px: 7,
    py: 3,
    borderRadius: 14,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    boxShadow: "0 10px 25px rgba(255,213,41,0.5)",
    border: "none",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover, &:focus": {
      bg: "#fff",
      color: "#764BA2",
      boxShadow: "0 14px 40px rgba(118,75,162,0.8)",
      outline: "none",
      transform: "translateY(-3px)",
    },
    svg: {
      ml: 4,
      fontSize: 28,
      transition: "transform 0.3s ease, color 0.3s ease",
    },
    "&:hover svg": {
      transform: "translateX(6px)",
      color: "#764BA2",
    },
  },
  ripple: {
    position: "absolute",
    borderRadius: "50%",
    transform: "scale(0)",
    animation: `${rippleAnimation} 600ms linear`,
    backgroundColor: "#764BA2",
    opacity: 0.3,
    pointerEvents: "none",
  },
};
