import BlogService from "../../services/blog.js";

function BlogCard({ blog }) {
  return (
    <div>
      <a href={`/blogs/${blog.id}`}>{blog.title} </a>
      <span> | </span>
      <span>{blog.date}</span>
    </div>
  );
}

export default BlogCard;
