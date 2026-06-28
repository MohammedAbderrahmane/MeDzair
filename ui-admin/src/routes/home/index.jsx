import { createResource } from "solid-js";

import ResourceArray from "../../reusable_components/ResourceArray";
import BlogCard from "../../components/BlogCard";

import BlogService from "../../services/blog";
import emptyImage from "../../assets/empty-box.png";
import "./.css"

function Index(params) {
  return <BlogsCards />;
}

const BlogsCards = () => {
  const [blogs, { mutate }] = createResource(
    async () => await BlogService.getAll()
  );

  return (
    <section class="blogs-page">
      <div class="blogs-page__header">
        <h1 class="blogs-page__title">Blogs</h1>
        <span class="blogs-page__count">
          {blogs() ? blogs().length : 0} post
          {blogs() && blogs().length === 1 ? "" : "s"}
        </span>
      </div>

      <div class="blogs-list">
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
      </div>
    </section>
  );
};

export default Index;