import { createEffect, createResource } from "solid-js";
import { useParams } from "@solidjs/router";

import Resource from "../reusable_components/Resource";
import BlogContent from "../components/Blog";

import BlogService from "../services/blog";

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

export default Blog;
