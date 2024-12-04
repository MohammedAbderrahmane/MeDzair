import BlogService from "../../services/blog.js";

function BlogCard({ blog, mutate }) {
  const handleUpdate = () => {
    window.location.href = `/blogs/update/${blog.id}`
  };

  const handleDelete = () => {
    BlogService.remove(blog.id);
    mutate((array) => array.filter((item) => item.id != blog.id));
  };

  return (
    <div>
      <a href={`/blogs/${blog.id}`}>{blog.title} </a>
      <span> | </span>
      <span>{blog.date}</span>
      <button onClick={handleUpdate}>update</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}

export default BlogCard;
