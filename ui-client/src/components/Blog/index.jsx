import "./content-style.css";

function Blog({ blog }) {
  return (
    <div className="blog-page">
      <h1>{blog.title}</h1>
      <div className="blog-content" innerHTML={blog.content} />

      {blog.additionContent && (
        <>
          <h1>{blog.additionTitle}</h1>
          <div className="blog-content" innerHTML={blog.additionContent} />
        </>
      )}
    </div>
  );
}

export default Blog;
