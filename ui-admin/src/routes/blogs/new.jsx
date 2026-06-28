import { createStore } from "solid-js/store";
import highlight from "highlight.js";
highlight.configure({ cssSelector: "pre" });

import BlogService from "../../services/blog";
import ImageService from "../../services/image";

import TextEditor from "../../reusable_components/TextEditor";
import Notification from "../../reusable_components/Notification";
import useNotification from "../../reusable_components/Notification/useNotification.js";

function CreateBlog(params) {
  const [blog, setBlog] = createStore({
    title: "",
    subTitle: "",
    readTime: "",
    tags: "",
    content: "",
    content: "",
  });

  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading();
    try {
      const formData = new FormData();
      formData.append("image", blog.coverImage);
      const imageURL = await ImageService.uploadimage(formData);

      await BlogService.add({
        ...blog,
        coverImageURL: `http://localhost:3000${imageURL}`,
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
          onInput={(e) => setBlog("title", e.currentTarget.value)}
        />
          </div>
          <div className="row-input">
            <label>subTitle</label>
            <textarea
              type="text"
              placeholder="A proper subtitle or a description"
              onInput={(e) => setBlog("subTitle", e.currentTarget.value)}
            />
          </div>
          <div className="row-input">
            <label>tags </label>
            <textarea
              type="text"
              placeholder="tags included in this post (split them with ,)"
              onInput={(e) => setBlog("tags", e.currentTarget.value)}
            />
          </div>
          <div className="row-input">
            <label>Read time (mins)</label>
            <input
              type="text"
              placeholder="time required to read the post"
              onInput={(e) => setBlog("readTime", e.currentTarget.value)}
            />
          </div>
          <div className="row-input">
            <label>cover image</label>
            <input
              type="file"
              placeholder="A proper title"
              onInput={(e) => setBlog("coverImage", e.currentTarget.files[0])}
            />
          </div>
        </div>

        <TextEditor
          placeholder="The content of a new blog"
          onInput={(quilHtml) => setBlog("content", quilHtml)}
        />
        <Notification status={notification} />
        <div class="row-input">
          <button class="btn" type="submit" onClick={handleSubmit}>
            create a new blog
          </button>
        </div>
      </form>
      <hr />
      <div class="blog-page">
        <h1>{blog.title}</h1>
        <div class="blog-content" innerHTML={blog.content} />
      </div>
    </>
  );
}

export default CreateBlog;
