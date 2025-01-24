import { createEffect, createResource } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import highlight from "highlight.js";
highlight.configure({ cssSelector: "pre" });

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
  
  const navigate = useNavigate();
  const handleDelete = () => {
    const confimChoice = window.confirm(
      `Are you sure you want to delete This blog titled : ${blog.title}`
    );
    if (!confimChoice) return;
    BlogService.remove(blog.id);
    navigate("/");
  };

  createEffect(async()=>{
    highlight.highlightAll()
  })

  return (
    <div className="blog-page">
      <div class="row">
        <button class="btn-anchor" onClick={handleUpdate}>
          update
        </button>
        <button class="btn-anchor" onClick={handleDelete}>
          delete
        </button>
      </div>
      <h1>{blog.title}</h1>
      <div className="blog-content" innerHTML={blog.content} />
    </div>
  );
}

export default Blog;
