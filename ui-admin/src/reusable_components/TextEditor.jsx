import Quill from "quill";
import { SolidQuill } from "solid-quill";
import "quill/dist/quill.snow.css";

function TextEditor(params) {
  const { onInput, defaultValue, ...rest } = params;

  const apps = [];
  let quillRef;

  const getQuillHtml = () => quillRef.root.innerHTML;

  const quillConfig = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ header: [2, 3, false] }],
        ["link", "image", "code-block"], // need fix / replacement
      ],
    },
  };

  return (
    <SolidQuill
      ref={quillRef}
      onTextChange={() => onInput(getQuillHtml())}
      innerHTML={defaultValue}
      modules={quillConfig}
      theme="snow"
      {...rest}
    />
  );
}

export default TextEditor;
