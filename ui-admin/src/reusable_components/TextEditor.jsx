import { onMount } from "solid-js";
import Quill from "quill";

import "quill/dist/quill.snow.css";

const toolbar = [
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ header: [2, 3, false] }],
  ["link", "image", "code-block"],
];

const options = {
  placeholder: "Hello, World! A new blog to write ",
  modules: {
    toolbar: toolbar,
  },
  theme: "snow",
};

function TextEditor(params) {
  const { onInput, initialValue, placeholder } = params;

  options.placeholder = placeholder;
  const getHtmlContent = () => quill.root.innerHTML;

  let quill;

  onMount(() => {
    const container = document.getElementById("editor");
    quill = new Quill(container, options);
    quill.root.innerHTML = initialValue || "";
    quill.on("text-change", function (delta, oldDelta, source) {
      if (source === "user") {
        onInput(getHtmlContent());
      }
    });
  });

  return <div id="editor" class="blog-content blog-editor"></div>;
}

export default TextEditor;
