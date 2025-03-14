import { createStore } from "solid-js/store";
import highlight from "highlight.js";
highlight.configure({ cssSelector: "pre" });

import BlogService from "../../services/blog";

import TextEditor from "../../reusable_components/TextEditor";
import Notification from "../../reusable_components/Notification";
import useNotification from "../../reusable_components/Notification/useNotification.js";

function CreateBlog(params) {
  const [blog, setBlog] = createStore({
    title: "",
    content: "",
  });

  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading();
    try {
      await BlogService.add(blog);
      setSuccess("Suceess");
    } catch (error) {
      setFailure(error.message);
    }
  };

  const handleHighlight = async (event) => {
    event.preventDefault();
    highlight.highlightAll();
  };

  return (
    <>
      <form class="new-blog">
        <h1>Adding a new blog</h1>
        <input
          type="text"
          placeholder="A proper title"
          onInput={(e) => setBlog("title", e.currentTarget.value)}
        />
        <TextEditor
          placeholder="The content of a new blog"
          onInput={(quilHtml) => setBlog("content", quilHtml)}
        />
        <Notification status={notification} />
        <div class="row">
          <button class="btn" type="submit" onClick={handleHighlight}>
            highlight code
          </button>
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
