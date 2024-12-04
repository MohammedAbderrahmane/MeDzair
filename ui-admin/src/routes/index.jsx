import { createResource } from "solid-js";

import ResourceArray from "../reusable_components/ResourceArray";
import BlogCard from "../components/Blog/card";

import BlogService from "../services/blog";

function Index(params) {
  const [blogs , {mutate}] = createResource(async () => await BlogService.getAll());
  return (
    <div>
      home page
      <div>This where i represent myself, all my expreties .</div>
      <div>I follow it with list of blogs availlable :</div>
      <div>
      <h2>List of blogs :</h2>
      <ResourceArray
        resources={blogs}
        RenderItem={(resource) => <BlogCard blog={resource} mutate={mutate}/>}
      />
    </div>
    </div>
  );
}

export default Index;
