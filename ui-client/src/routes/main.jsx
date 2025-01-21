import { createResource } from "solid-js";

import ResourceArray from "../reusable_components/ResourceArray";
import BlogCard from "../components/Blog/card";

import BlogService from "../services/blog";
import Card from "../reusable_components/Card";

function Main(params) {
  const welcomeText = [
    " ",
    "I am Louriachi Mohammed. In here I post blogs on programming ,networking and computer science",
    `I also give advices that i will not be held responseble on`,
  ];

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
        <div>
          <span className="">Hello There and welcome to MeDzair</span>
          <span>
            I am Louriachi Mohammed. In here I post blogs on programming
            ,networking and computer science
          </span>
          <span>
            I also give advices that i will not be held responseble on
          </span>
        </div>

        <ul>
          <SocialMediaComponent socialMedias={socialMedias} />
        </ul>
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
    <Card title="Blogs list : ">
      <ul>
        <ResourceArray
          resources={blogs}
          RenderItem={(resource) => (
            <BlogCard blog={resource} mutate={mutate} />
          )}
        />
      </ul>
    </Card>
  );
}

export default Main;
