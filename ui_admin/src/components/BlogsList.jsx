import { createResource } from "solid-js";

import ResourceArray from "../reusable_components/ResourceArray";
import BlogCard from "./Blog/BlogCard";

import BlogService from "../services/blog";

function BlogsList({}) {
  const [blogs] = createResource(async () => await BlogService.getAll());

  return (
    <div>
      <h2>List of blogs :</h2>
      <ResourceArray
        resources={blogs}
        RenderItem={(resource) => <BlogCard blog={resource} />}
      />
    </div>
  );
}

export default BlogsList;
