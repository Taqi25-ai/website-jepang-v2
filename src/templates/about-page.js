import React from "react"
import { graphql } from "gatsby"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query AboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
      }
    }
  }
`

const AboutPage = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark

  return (
    <Layout className="page">
      <Seo title={frontmatter.title} description={excerpt} />

      <div className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
            {frontmatter.title}
          </h1>
          <article
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </motion.div>
      </div>
    </Layout>
  )
}

export default AboutPage
