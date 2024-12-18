import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import Resource from "../../reusable_components/Resource";
import BlogService from "../../services/blog";

function Blog(params) {
  const { id } = useParams();
  const [blog] = createResource(async () => await BlogService.getOne(id));

  return (
    <Resource
      resource={blog}
      RenderComponent={(resource) => <BlogPage blog={resource} />}
    />
  );
}

function BlogPage({ blog }) {
  const handleUpdate = () => {
    window.location.href = `/blogs/update/${blog.id}`;
  };

  const handleDelete = () => {
    BlogService.remove(blog.id);
    mutate((array) => array.filter((item) => item.id != blog.id));
  };

  return (
    <div className="blog-page">
      <div class="row">
        <button class="btn-ancher" onClick={handleUpdate}>
          update
        </button>
        <button class="btn-ancher" onClick={handleDelete}>
          delete
        </button>
      </div>
      <h1>{blog.title}</h1>
      <div className="blog-content" innerHTML={blog.content} />
    </div>
  );
}

export default Blog;
