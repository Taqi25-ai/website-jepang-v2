// gatsby-node.js

// Load polyfills supaya File, Blob, FileReader tersedia saat build
if (typeof global.File === "undefined") {
  global.File = class File {
    constructor(parts = [], filename = '', options = {}) {
      this.parts = parts;
      this.name = filename;
      this.type = options.type || '';
      this.lastModified = options.lastModified || Date.now();
      this.size = parts.reduce((acc, part) => {
        if (typeof part === 'string') return acc + part.length;
        if (part instanceof Uint8Array) return acc + part.byteLength;
        return acc;
      }, 0);
    }
  };
}

if (typeof global.Blob === "undefined") {
  global.Blob = class Blob {
    constructor(parts = [], options = {}) {
      this.parts = parts;
      this.type = options.type || '';
      this.size = parts.reduce((acc, part) => {
        if (typeof part === 'string') return acc + part.length;
        if (part instanceof Uint8Array) return acc + part.byteLength;
        return acc;
      }, 0);
    }
  };
}

if (typeof global.FileReader === "undefined") {
  global.FileReader = class FileReader {
    readAsArrayBuffer(file) {
      this.result = new Uint8Array(file.size).buffer;
      if (this.onload) this.onload({ target: this });
    }
    readAsText(file) {
      this.result = file.parts.join('');
      if (this.onload) this.onload({ target: this });
    }
  };
}

// ===============================
// Gatsby Node API
// ===============================

const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogList = path.resolve(`./src/templates/blog-list.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.allMarkdownRemark.edges;
  let blogPostsCount = 0;

  posts.forEach((post, index) => {
    const id = post.node.id;
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      context: {
        id,
        previous,
        next,
      },
    });

    if (post.node.frontmatter.template === "blog-post") {
      blogPostsCount++;
    }
  });

  const postsPerPage = 9;
  const numPages = Math.ceil(blogPostsCount / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
