import { before, describe, test, todo, after } from "node:test";
import jwt from "jsonwebtoken";
import { getCurrentDay } from "../helpers/helpers.js";
import env from "../helpers/config.js";
import assert from "node:assert";
import supertest from "supertest";
import FileSystem from "fs";

import ErrorTypes from "../helpers/error_types.js";
import SuccessType from "../helpers/success_types.js";
import app from "../app.js";
const api = supertest(app);

const exempleValidId = "6OPUAnKyGjrG9uC1pu8jZg";
const exempleBlog = {
  title: "Exemple blog for testing",
  content: "In here goes the contnet of blog . Just for testing",
  id: "6OPUAnKyGjrG9uC1pu8jZg",
  date: "01/01/2000",
};
let autherzation;
const wrongAutherezation = `Bearer WRONG_TOKEN_HERE`;

before(() => {
  const id = exempleValidId;
  const blog = JSON.stringify(exempleBlog, null, 2);
  FileSystem.writeFileSync(`${env.BLOGS_FOLDER}/${id}.json`, blog);

  const authToken = jwt.sign({ username: "admin" }, env.JWT_TOKEN);
  autherzation = `Bearer ${authToken}`;
});

describe("With autherzation :", () => {
  test("POST /blogs", async () => {
    const newBlog = {
      title: "You can't quantify the circuit of primary SSD program!",
      content: "non-volatile",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", autherzation)
      .send(newBlog)
      .expect(SuccessType.Created);
  });

  test("PUT /blogs/ID", async () => {
    const updatedBlog = {
      title: "UPDATED : Exemple blog for testing : UPDATED",
      content:
        "UPDATED : In here goes the contnet of blog . Just for testing : UPDATED",
      id: "6OPUAnKyGjrG9uC1pu8jZg",
      date: "01/01/2000",
    };
    await api
      .put(`/api/blogs/${exempleValidId}`)
      .set("Authorization", autherzation)
      .send(updatedBlog)
      .expect(SuccessType.OK);
  });

  test("DELETE /blogs/ID", async () => {
    await api
      .delete(`/api/blogs/${exempleValidId}`)
      .set("Authorization", autherzation)
      .expect(SuccessType.NoContent);
  });
});

describe("No autherzation :", () => {
  test("POST /blogs", async () => {
    const newBlog = {
      title: "You can't quantify the circuit of primary SSD program!",
      content: "non-volatile",
    };
    const result = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(ErrorTypes.UNAUTHORIZED);
    assert.equal(result.body.error, "You have no authorization");
  });

  test("PUT /blogs/ID", async () => {
    const updatedBlog = {
      title: "UPDATED : Exemple blog for testing : UPDATED",
      content:
        "UPDATED : In here goes the contnet of blog . Just for testing : UPDATED",
      id: "6OPUAnKyGjrG9uC1pu8jZg",
      date: "01/01/2000",
    };
    const result = await api
      .put(`/api/blogs/${exempleValidId}`)
      .send(updatedBlog)
      .expect(ErrorTypes.UNAUTHORIZED);
    assert.equal(result.body.error, "You have no authorization");
  });

  test("DELETE /blogs/ID", async () => {
    const result = await api
      .delete(`/api/blogs/${exempleValidId}`)
      .expect(ErrorTypes.UNAUTHORIZED);
    assert.equal(result.body.error, "You have no authorization");
  });
});

describe("Wrong credentials :", () => {
  test("POST /blogs", async () => {
    const newBlog = {
      title: "You can't quantify the circuit of primary SSD program!",
      content: "non-volatile",
    };
    const result = await api
      .post("/api/blogs")
      .set("Authorization", wrongAutherezation)
      .send(newBlog)
      .expect(ErrorTypes.UNAUTHORIZED);
    assert.equal(result.body.error, "wrong credentials");
  });

  test("PUT /blogs/ID", async () => {
    const updatedBlog = {
      title: "UPDATED : Exemple blog for testing : UPDATED",
      content:
        "UPDATED : In here goes the contnet of blog . Just for testing : UPDATED",
      id: "6OPUAnKyGjrG9uC1pu8jZg",
      date: "01/01/2000",
    };
    const result = await api
      .put(`/api/blogs/${exempleValidId}`)
      .set("Authorization", wrongAutherezation)
      .send(updatedBlog)
      .expect(ErrorTypes.UNAUTHORIZED);
    assert.equal(result.body.error, "wrong credentials");
  });

  test("DELETE /blogs/ID", async () => {
    const result = await api
      .delete(`/api/blogs/${exempleValidId}`)
      .set("Authorization", wrongAutherezation)
      .expect(ErrorTypes.UNAUTHORIZED);
    assert.equal(result.body.error, "wrong credentials");
  });
});

after(() => {
  const blogsFiles = FileSystem.readdirSync(env.BLOGS_FOLDER);
  for (const file of blogsFiles)
    FileSystem.unlinkSync(`${env.BLOGS_FOLDER}/${file}`);
  FileSystem.rmdirSync(env.BLOGS_FOLDER);
});
