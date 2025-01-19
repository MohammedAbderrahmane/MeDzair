import { onMount } from "solid-js";
import Quill from "quill";

import "quill/dist/quill.snow.css";
import ImageService from "../services/image.js";

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

  const imageHandler = function (value) {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = async (e) => {
      try {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        const imageURL = await ImageService.uploadimage(formData);

        const fileResult = new FileReader();
        fileResult.onload = () => {
          this.quill.insertEmbed(
            this.quill.getSelection().index,
            "image",
            `http://localhost:3000${imageURL}` // Temperary sullotion
          );
        };

        fileResult.readAsDataURL(e.target.files[0]);

        console.log(`http://localhost:3000/${imageURL}`);
      } catch (error) {
        alert(`Failed to insert image : ${error}`);
      }
    };

    input.click();
  };

  let quill;

  onMount(() => {
    const container = document.getElementById("editor");
    quill = new Quill(container, options);
    quill.root.innerHTML = initialValue || "";
    quill.getModule("toolbar").addHandler("image", imageHandler);

    quill.on("text-change", function (delta, oldDelta, source) {
      if (source == "user") {
        onInput(quill.getSemanticHTML());
      }
    });
  });

  return <div id="editor" class="blog-content blog-editor"></div>;
}

export default TextEditor;
