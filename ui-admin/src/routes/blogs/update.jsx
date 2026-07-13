import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";

import Resource from "../../reusable_components/Resource";
import TextEditor from "../../reusable_components/TextEditor";
import Notification from "../../reusable_components/Notification";
import useNotification from "../../reusable_components/Notification/useNotification.js";

import BlogService from "../../services/blog";
import ImageService from "../../services/image";

function Update(params) {
  const { id } = useParams();

  const [blog, { mutate }] = createResource(
    async () => await BlogService.getOne(id),
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
      const formData = new FormData();
      formData.append("image", blog.coverImage);
      const imageURL = await ImageService.uploadimage(formData);

      await BlogService.update(blog.id, {
        ...blog,
        coverImageURL: imageURL,
      });
      setSuccess("Suceess");
    } catch (error) {
      setFailure(error.message);
    }
  };

  return (
    <>
      <form class="new-blog">
        <div className="fields">
          <div className="row-input">
            <label>Title</label>
            <input
              type="text"
              placeholder="A proper title"
              value={blog.title}
              onInput={(e) =>
                mutate((blog) => {
                  blog.title = e.currentTarget.value;
                  return blog;
                })
              }
            />
          </div>
          <div className="row-input">
            <label>subTitle</label>
            <textarea
              type="text"
              value={blog.subTitle}
              placeholder="A proper subtitle or a description"
              onInput={(e) =>
                mutate((blog) => {
                  blog.subTitle = e.currentTarget.value;
                  return blog;
                })
              }
            />
          </div>
          <div className="row-input">
            <label>tags </label>
            <textarea
              type="text"
              value={blog.tags.join(" , ")}
              placeholder="tags included in this post (split them with ,)"
              onInput={(e) =>
                mutate((blog) => {
                  blog.tags = e.currentTarget.value;
                  return blog;
                })
              }
            />
          </div>
          <div className="row-input">
            <label>Read time (mins)</label>
            <input
              type="text"
              value={blog.readTime.replace(/\s*min\./, "")}
              placeholder="time required to read the post"
              onInput={(e) =>
                mutate((blog) => {
                  blog.readTime = e.currentTarget.value;
                  return blog;
                })
              }
            />
          </div>
          <div className="row-input">
            <label>cover image</label>
            <input
              type="file"
              placeholder="A proper title"
              onInput={(e) =>
                mutate((blog) => {
                  blog.coverImage = e.currentTarget.files[0];
                  return blog;
                })
              }
            />
          </div>
        </div>

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
