import FileSystem from "fs";
import crypto from "crypto";

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

  if (!hasAllAttributes(blog, ["title", "content"]))
    throw new CustomError("Bad Request");

  const blogJson = JSON.stringify(
    { ...blog, id, date: getCurrentDay() },
    null,
    2
  );

  FileSystem.writeFileSync(
    `${process.env.BLOGS_FOLDER}/${id}.json`,
    blogJson,
    "utf-8"
  );
  return { ...blog, id, date: getCurrentDay() };
};

Blog.getOne = (id) => {
  if (!fileExists(`${process.env.BLOGS_FOLDER}/${id}.json`))
    throw new CustomError("Blog Not Found");

  const blogData = FileSystem.readFileSync(
    `${process.env.BLOGS_FOLDER}/${id}.json`,
    "utf-8"
  );
  const blogObject = JSON.parse(blogData);
  return blogObject;
};

Blog.getAll = () => {
  const blogs = [];

  const files = FileSystem.readdirSync(`${process.env.BLOGS_FOLDER}`);
  for (const blogFile of files) {
    const blogData = FileSystem.readFileSync(
      `${process.env.BLOGS_FOLDER}/${blogFile}`
    );
    const blogObject = JSON.parse(blogData);
    blogs.push(blogObject);
  }
  return blogs;
};

Blog.delete = (id) => {
  if (!fileExists(`${process.env.BLOGS_FOLDER}/${id}.json`))
    throw new CustomError("Blog Not Found");

  FileSystem.unlinkSync(`${process.env.BLOGS_FOLDER}/${id}.json`);
};

Blog.update = (id, blog) => {
  if (!fileExists(`${process.env.BLOGS_FOLDER}/${id}.json`))
    throw new CustomError("Blog Not Found");

  if (!hasAllAttributes(blog, ["date", "title", "content"]))
    throw new CustomError("Bad Request");

  blog.updateDate = blog.updateDate || getCurrentDay();
  const blogJson = JSON.stringify({ ...blog, id }, null, 2);

  FileSystem.writeFileSync(
    `${process.env.BLOGS_FOLDER}/${id}.json`,
    blogJson,
    "utf-8"
  );
  return blog;
};

export default Blog;
