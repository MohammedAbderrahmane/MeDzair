function Blog({ blog }) {
  return (
    <div>
      <h1>
        ---- {blog.title} - {blog.date} ----
      </h1>
      <div innerHTML={blog.content} />
      <h1>
        ---- {blog.additionTitle}- {blog.updateDate} ----
      </h1>

      <div innerHTML={blog.additionContent} />
    </div>
  );
}

export default Blog;
