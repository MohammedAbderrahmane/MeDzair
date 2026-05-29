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
        <img src="/favicon.png" width="500" />
        <div>
          <h3>Welcome to ~/medzair.com</h3>
          <p>
            Welcome to my blog website, where I share articles, tutorials, and
            experiences about programming and networking. I hope you find this
            website usefull in your journey. 
            <b>
              Use at your own discretion. I'm not liable for the borken code or
              server crashing :)
            </b>
          </p>

          <p>Anyway, Have fun reading these blogs</p>
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
    async () => await BlogService.getAll()
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
