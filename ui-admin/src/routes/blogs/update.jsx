import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";

import Resource from "../../reusable_components/Resource";
import TextEditor from "../../reusable_components/TextEditor";
import Notification from "../../reusable_components/Notification";
import useNotification from "../../reusable_components/Notification/useNotification.js";

import BlogService from "../../services/blog";

function Update(params) {
  const { id } = useParams();

  const [blog, { mutate }] = createResource(
    async () => await BlogService.getOne(id)
  );

  return (
    <Resource
      resource={blog}
      RenderComponent={(resource) => (
        <UpdateComponent blog={resource} mutate={mutate} />
      )}
    />
  );
}

function UpdateComponent({ blog, mutate }) {
  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading();
    try {
      await BlogService.update(blog.id, blog);
      setSuccess("Suceess");
    } catch (error) {
      setFailure(error.message);
    }
  };

  return (
    <>
      <form class="new-blog">
        <h1>Updating a blog</h1>
        <input
          type="text"
          placeholder="A proper updated title..."
          value={blog.title}
          onInput={(event) =>
            mutate((blog) => {
              blog.additionTitle = event.currentTarget.value;
              return blog;
            })
          }
        />
        <TextEditor
          placeholder="The content of a new blog"
          initialValue={blog.content}
          onInput={(quilHtml) =>
            mutate((blog) => {
              blog.content = quilHtml;
              return blog;
            })
          }
        />
        <Notification status={notification} />
        <div class="row">
          <button class="btn" type="submit" onClick={handleSubmit}>
            update the blog
          </button>
          <a href={`/blogs/${blog.id}`}>
            <button class="btn">check the blog</button>
          </a>
        </div>
      </form>
    </>
  );
}

export default Update;
