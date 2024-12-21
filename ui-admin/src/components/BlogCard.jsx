import BlogService from "../services/blog.js";
import { useNavigate } from "@solidjs/router";

function BlogCard({ blog, mutate }) {
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/blogs/update/${blog.id}`);
    // window.location.href = `/blogs/update/${blog.id}`;
  };

  const handleDelete = () => {
    const confimChoice = window.confirm(
      `Are you sure you want to delete This blog titled : ${blog.title}`
    );
    if (!confimChoice) return;
    BlogService.remove(blog.id);
    mutate((array) => array.filter((item) => item.id != blog.id));
  };

  return (
    <li class="blog-card">
      <a class="break-line" href={`/blogs/${blog.id}`}>
        {blog.title}
      </a>
      <span>{blog.date}</span>
      <div class="row">
        <button class="btn-ancher" onClick={handleUpdate}>
          update
        </button>
        <button class="btn-ancher" onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  );
}

export default BlogCard;
