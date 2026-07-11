import BlogService from "../services/blog.js";
import { useNavigate } from "@solidjs/router";

function BlogCard({
  blog,
  mutate,
}) {
  const navigate = useNavigate();
  const handleUpdate = (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/blogs/update/${blog.id}`);
    // window.location.href = `/blogs/update/${blog.id}`;
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const confimChoice = window.confirm(
      `Are you sure you want to delete This blog titled : ${blog.title}`,
    );
    if (!confimChoice) return;
    BlogService.remove(blog.id);
    mutate((array) => array.filter((item) => item.id != blog.id));
  };

  console.log(blog);

  return (
    <li class="blog-card">
      <a href={`/admin/blogs/${blog.id}`}>
        {blog.coverImageURL ? (
          <img className="blog-card__image" src={blog.coverImageURL} />
        ) : (
          <div className="blog-card__image" />
        )}
        <div className="blog-card__body">
          {blog.tags && (
            <div className="blog-card__tags">
              {blog.tags.map((tag) => (
                <span key={tag} className="blog-card__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="blog-card__title">{blog.title}</h2>
          <div className="blog-card__meta">
            {blog.subTitle && (
              <>
                {blog.subTitle}
                <br />
              </>
            )}
            {blog.date}
            {blog.readTime && (
              <>
                <span>•</span>
                {blog.readTime}
              </>
            )}
          </div>
          <div class="row">
            <button class="btn-anchor" onClick={handleUpdate}>
              update
            </button>
            <button class="btn-anchor" onClick={handleDelete}>
              delete
            </button>
          </div>

          {/* <a class="break-line" href={`/blogs/${blog.id}`}>
          {blog.title}
          </a>
          <span>{blog.date}</span>
          */}
        </div>
      </a>
    </li>
  );
}

export default BlogCard;
