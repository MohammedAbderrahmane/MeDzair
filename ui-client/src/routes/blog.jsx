import { createEffect, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import highlight from "highlight.js";
highlight.configure({ cssSelector: "pre" });

import Resource from "../reusable_components/Resource";

import BlogService from "../services/blog";

import "../components/Blog/content-style.css";

function Blog(params) {
  const { id } = useParams();

  const [blog] = createResource(async () => await BlogService.getOne(id));

  createEffect(() => {
    setTimeout(() => {
      BlogService.addView(id);
      console.log("blog is confirmed read");
    }, 1000 * 60 * 5);
  });

  return (
    <>
      <Resource
        resource={blog}
        RenderComponent={(resource) => <BlogContent blog={resource} />}
      />
    </>
  );
}

function BlogContent({ blog }) {
  createEffect(async () => highlight.highlightAll());

  return (
    <div className="blog-page">
      <h1>{blog.title}</h1>
      <div className="blog-content" innerHTML={blog.content} />
    </div>
  );
}

export default Blog;
