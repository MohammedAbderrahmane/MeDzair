import { createStore } from "solid-js/store";
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adding a new blog :</h2>
      <table border="solid">
        <tbody>
          <tr>
            <td>
              <label htmlFor="title">Title :</label>
            </td>
            <td>
              <input
                type="text"
                id="title"
                onInput={(e) => setBlog("title", e.currentTarget.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <label htmlFor="content">Content of the blog :</label>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <TextEditor
          placeholder="The content of a new blog"
          onInput={(quilHtml) => setBlog("content", quilHtml)}
        />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button type="submit">submit</button>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Notification status={notification} />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default CreateBlog;
