import FileSystem from "fs";
import crypto from "crypto";
import env from "../helpers/config.js";

import {
  hasAllAttributes,
  CustomError,
  fileExists,
  getCurrentDay,
  getFileNameAndExtention,
  toBase64,
} from "../helpers/helpers.js";

const Blog = {
  create: () => {},
  getOne: () => {},
  getAll: () => {},
  update: () => {},
  delete: () => {},
  view: () => {},
  uploadImage: () => {},
};

Blog.create = (blog) => {
  const id = crypto.randomBytes(16).toString("base64url");

  if (!blog.title || blog.title == "")
    throw new CustomError("BAD_REQUEST", "title is messing");
  if (!blog.content || blog.content == "")
    throw new CustomError("BAD_REQUEST", "content is messing");

  const blogJson = JSON.stringify(
    { ...blog, id, date: getCurrentDay(), viewCount: 0 },
    null,
    2
  );

  FileSystem.writeFileSync(`${env.BLOGS_FOLDER}/${id}.json`, blogJson, "utf-8");
  return { ...blog, id, date: getCurrentDay() };
};

Blog.getOne = (id) => {
  if (!fileExists(`${env.BLOGS_FOLDER}/${id}.json`))
    throw new CustomError("BLOG_NOT_FOUND");

  const blogData = FileSystem.readFileSync(
    `${env.BLOGS_FOLDER}/${id}.json`,
    "utf-8"
  );
  const blog = JSON.parse(blogData);
  return blog;
};

Blog.getAll = () => {
  const blogs = [];

  const files = FileSystem.readdirSync(`${env.BLOGS_FOLDER}`);
  for (const blogFile of files) {
    const blogData = FileSystem.readFileSync(`${env.BLOGS_FOLDER}/${blogFile}`);
    const blog = JSON.parse(blogData);
    blogs.push({
      title: blog.title,
      date: blog.date,
      id: blog.id,
      viewCount: blog.viewCount,
    });
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
    throw new CustomError("BLOG_NOT_FOUND", "Blog doesn't exist");

  if (!hasAllAttributes(blog, ["date", "title", "content"]))
    throw new CustomError("BAD_REQUEST", "Blog messing atributes");

  blog.updateDate = blog.updateDate || getCurrentDay();
  const blogJson = JSON.stringify({ ...blog, id }, null, 2);

  FileSystem.writeFileSync(`${env.BLOGS_FOLDER}/${id}.json`, blogJson, "utf-8");
  return blog;
};

Blog.view = (id) => {
  if (!fileExists(`${env.BLOGS_FOLDER}/${id}.json`))
    throw new CustomError("BLOG_NOT_FOUND");

  const blogData = FileSystem.readFileSync(
    `${env.BLOGS_FOLDER}/${id}.json`,
    "utf-8"
  );
  const blog = JSON.parse(blogData);

  // if (!blog.macList) blog.macList = [];
  if (!blog.viewCount) blog.viewCount = 0;

  // for (const macItem of blog.macList) {
  //   if (mac == macItem) return false;
  // }
  // blog.macList.push(mac);
  blog.viewCount += 1;

  FileSystem.writeFileSync(
    `${env.BLOGS_FOLDER}/${id}.json`,
    JSON.stringify(blog, null, 2)
  );

  return true;
};

export default Blog;
