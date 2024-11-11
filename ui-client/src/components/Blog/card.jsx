function BlogCard({ blog }) {
  return (
    <li className="blog-card">
      <a className="break-line" href={`/blogs/${blog.id}`}>{blog.title} </a>
      <span>{blog.date}</span>
    </li>
  );
}

export default BlogCard;
