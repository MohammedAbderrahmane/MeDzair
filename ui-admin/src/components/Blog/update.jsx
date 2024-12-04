import TextEditor from "../../reusable_components/TextEditor";
import ServiceBlogs from "../../services/blog.js";

function Update({ blog, mutate }) {
  const handleSubmit = () => ServiceBlogs.update(blog.id, blog);

  return (
    <div>
      <h2>Fixes :</h2>
      <div>
        <label>titre de blog :</label>
        <input
          type="text"
          value={blog.title}
          onInput={(event) => {
            mutate((blog) => {
              blog.additionTitle = event.currentTarget.value;
              return blog;
            });
          }}
        />
      </div>
      <TextEditor
        defaultValue={blog.content}
        onInput={(quilHtml) =>
          mutate((blog) => {
            blog.content = quilHtml;
            return blog;
          })
        }
      />

      <h2>Additions :</h2>
      <div>
        <label>titre d'addition :</label>
        <input
          type="text"
          value={blog.additionTitle}
          onInput={(event) => {
            mutate((blog) => {
              blog.additionTitle = event.currentTarget.value;
              return blog;
            });
          }}
        />
      </div>
      <TextEditor
        defaultValue={blog.additionContent}
        onInput={(quilHtml) =>
          mutate((blog) => {
            blog.additionContent = quilHtml;
            return blog;
          })
        }
      />
      <button onClick={handleSubmit}>submit update</button>
    </div>
  );
}

export default Update;
