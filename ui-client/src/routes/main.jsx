import { createResource } from "solid-js";

import ResourceArray from "../reusable_components/ResourceArray";
import BlogCard from "../components/Blog/card";

import BlogService from "../services/blog";
import Card from "../reusable_components/Card";

function Main(params) {
  const socialMedias = [
    {
      name: "github",
      href: "https://github.com/MohammedAbderrahmane",
      img: "github.png",
    },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/louriachi-abderrahman-27740230a/",
      img: "linkedin.png  ",
    },
  ];

  return (
    <>
      <div className="introduction">
        <img src="/favicon.png" width="1000" />
        <div>
          <h3>Welcome to ~/medzair.com</h3>
          <p>
            A blog about programming and networking — what I'm learning,
            building, and occasionally breaking. Expect tutorials, write-ups
            from real projects, and the odd networking ""deep""-dive <br/>
            <b>
             Code samples are provided as-is. If something crashes your server, that's between you and it :)
            </b>
          </p>

          <p>Anyway, Have fun reading</p>
        </div>
      </div>
      <Blogs />
    </>
  );
}

function SocialMediaComponent({ socialMedias }) {
  return (
    <For each={socialMedias}>
      {(item) => (
        <li>
          <img src={item.img} width="25" />
          <a href={item.href}>{item.name}</a>
        </li>
      )}
    </For>
  );
}

function Blogs(params) {
  const [blogs, { mutate }] = createResource(
    async () => await BlogService.getAll(),
  );

  return (
    <>
      <ul className="blogs-list">
        <ResourceArray
          resources={blogs}
          RenderItem={(resource) => (
            <BlogCard blog={resource} mutate={mutate} />
          )}
        />
      </ul>
    </>
  );
}

export default Main;
