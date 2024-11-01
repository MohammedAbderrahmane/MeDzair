import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";

import Resource from "../../reusable_components/Resource";
import UpdateComponent from "../../components/Blog/update";

import BlogService from "../../services/blog";

function Update(params) {
  const { id } = useParams();

  const [blog, { mutate }] = createResource(
    async () => await BlogService.getOne(id)
  );

  return (
    <div>
      <Resource
        resource={blog}
        RenderComponent={(resource) => (
          <UpdateComponent blog={resource} mutate={mutate} />
        )}
      />
    </div>
  );
}

export default Update;
