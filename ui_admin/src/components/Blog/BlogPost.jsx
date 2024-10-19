function BlogPost({ blog }) {
  console.log(blog);
  return (
    <div>
      <h1>{blog.title}</h1>
      <div innerHTML={blog.content} />
    </div>
  );
}

export default BlogPost;
