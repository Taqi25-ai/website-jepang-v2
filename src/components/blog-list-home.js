/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"

import PostCard from "./post-card"

export default function BlogListHome(props) {
  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)
  return <PostMaker data={posts} />
}

const PostMaker = ({ data }) => (
  <section className="home-posts">
    <h2>
      Latest in <strong>Blog</strong>{" "}
      <span className="icon -right">
        <RiArrowDownLine />
      </span>
    </h2>
    <div className="grids col-1 sm-2 lg-3">{data}</div>
<Link
  className="button"
  to="/blog"
  sx={{
    variant: "variants.button",
    transition: "0.3s",
    backgroundColor: "#FFD529", // warna kuning
    color: "#000", // teks hitam biar kontras, bisa diubah
    '&:hover': {
      backgroundColor: "#28a745", // warna hijau saat hover
      color: "#fff", // teks putih saat hover, bisa diubah
    },
  }}
>
  See more``
  <span className="icon -right">
    <RiArrowRightSLine />
  </span>
</Link>

  </section>
)
git 