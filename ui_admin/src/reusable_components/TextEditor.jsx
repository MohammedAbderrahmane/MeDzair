import { SolidQuill } from "solid-quill";
import "quill/dist/quill.snow.css";

function TextEditor(params) {
  const { onInput, defaultValue, ...rest } = params;

  let quillRef;

  const getQuillHtml = () => quillRef.root.innerHTML;

  return (
    <SolidQuill
      class="quill"
      ref={quillRef}
      onTextChange={() => onInput(getQuillHtml())}
      innerHTML={defaultValue}
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ size: ["small", false, "large"] }],
          [{ header: [2, 3, 4, 5, 6, false] }],
          [("link", "image")],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
      }}
      theme="snow"
      {...rest}
    />
  );
}

export default TextEditor;
