import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";

import Resource from "../reusable_components/Resource";
import BlogPost from "../components/Blog/BlogPost";

import BlogService from "../services/blog";

function Blog(params) {
  const { id } = useParams();

  const [blog] = createResource(async () => await BlogService.getOne(id));

  return (
    <div>
      <Resource
        resource={blog}
        RenderComponent={(resource) => <BlogPost blog={resource} />}
      />
    </div>
  );
}

export default Blog;
