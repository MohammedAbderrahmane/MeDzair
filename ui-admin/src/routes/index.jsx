import { createResource } from "solid-js";

import ResourceArray from "../reusable_components/ResourceArray";
import BlogCard from "../components/BlogCard";

import BlogService from "../services/blog";

function Index(params) {
  return (
    <div>
      <BlogsCards />
    </div>
  );
}

const BlogsCards = () => {
  const [blogs, { mutate }] = createResource(
    async () => await BlogService.getAll()
  );

  return (
    <>
      <fieldset class="blogs-list">
        <legend>List of blogs :</legend>
        <ResourceArray
          resources={blogs}
          RenderItem={(resource) => (
            <BlogCard blog={resource} mutate={mutate} />
          )}
        />
      </fieldset>
    </>
  );
};

export default Index;
