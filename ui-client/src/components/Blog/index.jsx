import "./content-style.css";

function Blog({ blog }) {
  return (
    <div className="blog-page">
      <h1>{blog.title}</h1>
      <div className="blog-content" innerHTML={blog.content} />
    </div>
  );
}

export default Blog;
