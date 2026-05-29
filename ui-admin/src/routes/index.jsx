import { createResource } from "solid-js";

import ResourceArray from "../reusable_components/ResourceArray";
import BlogCard from "../components/BlogCard";

import BlogService from "../services/blog";
import emptyImage from '../assets/empty-box.png';

function Index(params) {
  return <BlogsCards />;
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
          EmptyDisplay={
            <div className="empty-list">
              <img src={emptyImage} />
              <p>There is no posts, create one now!</p>
            </div>
          }
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
