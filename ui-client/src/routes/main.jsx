import { createResource } from "solid-js";

import ResourceArray from "../reusable_components/ResourceArray";
import BlogCard from "../components/Blog/card";

import BlogService from "../services/blog";

function Main(params) {
  const email = "louriachiabderrahman13@gmail.com";
  const socialMedia = [
    { name: "Github", href: "https://github.com/MohammedAbderrahmane" },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/louriachi-abderrahman-27740230a/",
    },
  ];
  const [blogs, { mutate }] = createResource(
    async () => await BlogService.getAll()
  );

  return (
    <>
      <div className="introduction">
        <div>
          <span className="break-line">Hello there 🖐️ !</span>
          <p>
            Louriachi Mohammed Here. In here i wil post blogs on
            programming,networking and computer science .
          </p>
          <p className="break-line">
            I will also give some advices that i will not be held responseble on
            😂
          </p>
          <div className="email-link">
            You can contact me on : <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>

        <ul>
          <span>links :</span>
          <SocialMediaComponent socialMedia={socialMedia} />
        </ul>
      </div>
      <div>
        <h2>List of blogs :</h2>
        <ul>
          <ResourceArray
            resources={blogs}
            RenderItem={(resource) => (
              <BlogCard blog={resource} mutate={mutate} />
            )}
          />
        </ul>
      </div>
    </>
  );
}

const SocialMediaComponent = ({ socialMedia }) => (
  <For each={socialMedia}>
    {(item) => (
      <li>
        <a href={item.href}>{item.name}</a>
      </li>
    )}
  </For>
);

export default Main;
