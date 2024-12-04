import FileSystem from "fs";
import crypto from "crypto";
import env from "../helpers/config.js";

import {
  hasAllAttributes,
  CustomError,
  fileExists,
  getCurrentDay,
} from "../helpers/helpers.js";

const Blog = {
  create: () => {},
  getOne: () => {},
  getAll: () => {},
  update: () => {},
  delete: () => {},
};

Blog.create = (blog) => {
  const id = crypto.randomBytes(16).toString("base64url");

  if (!blog.title || blog.title == "")
    throw new CustomError("BAD_REQUEST", "title is messing");
  if (!blog.content || blog.content == "")
    throw new CustomError("BAD_REQUEST", "content is messing");

  const blogJson = JSON.stringify(
    { ...blog, id, date: getCurrentDay() },
    null,
    2
  );

  FileSystem.writeFileSync(
    `${env.BLOGS_FOLDER}/${id}.json`,
    blogJson,
    "utf-8"
  );
  return { ...blog, id, date: getCurrentDay() };
};

Blog.getOne = (id) => {
  if (!fileExists(`${env.BLOGS_FOLDER}/${id}.json`))
    throw new CustomError("BLOG_NOT_FOUND");

  const blogData = FileSystem.readFileSync(
    `${env.BLOGS_FOLDER}/${id}.json`,
    "utf-8"
  );
  const blogObject = JSON.parse(blogData);
  return blogObject;
};

Blog.getAll = () => {
  const blogs = [];

  const files = FileSystem.readdirSync(`${env.BLOGS_FOLDER}`);
  for (const blogFile of files) {
    const blogData = FileSystem.readFileSync(
      `${env.BLOGS_FOLDER}/${blogFile}`
    );
    const blogObject = JSON.parse(blogData);
    blogs.push(blogObject); 
  }
  return blogs;
};

Blog.delete = (id) => {
  if (!fileExists(`${env.BLOGS_FOLDER}/${id}.json`))
    throw new CustomError("BLOG_NOT_FOUND");

  FileSystem.unlinkSync(`${env.BLOGS_FOLDER}/${id}.json`);
};

Blog.update = (id, blog) => {
  if (!fileExists(`${env.BLOGS_FOLDER}/${id}.json`))
    throw new CustomError("BLOG_NOT_FOUND","Blog doesn't exist");

  if (!hasAllAttributes(blog, ["date", "title", "content"]))
    throw new CustomError("BAD_REQUEST","Blog messing atributes");

  blog.updateDate = blog.updateDate || getCurrentDay();
  const blogJson = JSON.stringify({ ...blog, id }, null, 2);

  FileSystem.writeFileSync(
    `${env.BLOGS_FOLDER}/${id}.json`,
    blogJson,
    "utf-8"
  );
  return blog;
};

export default Blog;
