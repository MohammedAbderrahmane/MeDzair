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
const exempleInvalidId = "6oPUAnKyGjrG9uC1pu8jZg";
const exempleBlog = {
  title: "Exemple blog for testing",
  content: "In here goes the contnet of blog . Just for testing",
  id: "6OPUAnKyGjrG9uC1pu8jZg",
  date: "01/01/2000",
};
let defaultToken;
before(() => {
  const authToken = jwt.sign({ username: "admin" }, env.JWT_TOKEN);
  const a = jwt.verify(authToken,env.JWT_TOKEN)
  defaultToken = `Bearer ${authToken}`;
});

describe("GET :", () => {
  before(() => {
    const id = exempleValidId;
    const blog = JSON.stringify(exempleBlog, null, 2);
    FileSystem.writeFileSync(`${env.BLOGS_FOLDER}/${id}.json`, blog);
  });

  test("GET / : return ALL", async () => {
    const result = await api.get(`/api/blogs/`).expect(SuccessType.OK);
    const blogsCount = FileSystem.readdirSync(env.BLOGS_FOLDER).length;
    assert.strictEqual(result.body.length, blogsCount);
    if (blogsCount == 0) assert.deepEqual(result.body, []);
  });

  test("GET /ID : return ONE", async () => {
    const result = await api
      .get(`/api/blogs/${exempleValidId}`)
      .expect(SuccessType.OK);
    assert.deepEqual(result.body, exempleBlog);
  });

  test("GET /WRONG_ID : return NOT_FOUND", async () => {
    await api.get(`/api/blogs/${exempleInvalidId}`).expect(404);
  });

  test("GET / : empty Dir : return []", async () => {
    FileSystem.unlinkSync(`${env.BLOGS_FOLDER}/${exempleValidId}.json`);
    const result = await api.get(`/api/blogs`).expect(SuccessType.OK);
    assert.strictEqual(result.body.length, 0);
    assert.deepEqual(result.body, []);
  });
});

describe("POST :", () => {
  test("POST /blogs", async () => {
    const newBlog = {
      title: "You can't quantify the circuit of primary SSD program!",
      content: "non-volatile",
    };
    const result1 = await api
      .post("/api/blogs")
      .set("Authorization", defaultToken)
      .send(newBlog)
      .expect(SuccessType.Created);
    assert.strictEqual(result1.body.title, newBlog.title);
    assert.strictEqual(result1.body.content, newBlog.content);
    const result2 = await api
      .get(`/api/blogs/${result1.body.id}`)
      .expect(SuccessType.OK);
    assert.strictEqual(result2.body.title, newBlog.title);
    assert.strictEqual(result2.body.content, newBlog.content);
  });

  test("POST /blogs : missing title : return BAD_REQUEST", async () => {
    const newBlog = {
      content: "non-volatile",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", defaultToken)
      .send(newBlog)
      .expect(400);
  });

  test("POST /blogs : missing content : return BAD_REQUEST", async () => {
    const newBlog = {
      title: "You can't quantify the circuit of primary SSD program!",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", defaultToken)
      .send(newBlog)
      .expect(400);
  });
});

describe("PUT :", () => {
  before(() => {
    const id = exempleValidId;
    const blog = JSON.stringify(exempleBlog, null, 2);
    FileSystem.writeFileSync(`${env.BLOGS_FOLDER}/${id}.json`, blog);
  });

  test("PUT /ID : return blog & blog updated", async () => {
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
      .set("Authorization", defaultToken)
      .expect(SuccessType.OK);
    assert.deepEqual(result.body, {
      ...updatedBlog,
      updateDate: getCurrentDay(),
    });
    const blog = FileSystem.readFileSync(
      `${env.BLOGS_FOLDER}/${exempleValidId}.json`
    );
    assert.strictEqual(blog.includes(updatedBlog.title), true);
    assert.strictEqual(blog.includes(updatedBlog.content), true);
    assert.strictEqual(blog.includes(updatedBlog.date), true);
    assert.strictEqual(blog.includes(getCurrentDay()), true);
  });

  test("PUT /ID : missing title : return BAD_REQUEST", async () => {
    const updatedBlog = {
      content:
        "UPDATED2 : In here goes the contnet of blog . Just for testing : UPDATED2",
      id: "6OPUAnKyGjrG9uC1pu8jZg",
      date: "01/01/2000",
    };
    await api
      .put(`/api/blogs/${exempleValidId}`)
      .set("Authorization", defaultToken)
      .send(updatedBlog)
      .expect(ErrorTypes.BAD_REQUEST);
  });
  test("PUT /ID : missing content : return BAD_REQUEST", async () => {
    const updatedBlog = {
      title: "UPDATED2 : Exemple blog for testing : UPDATED2",
      id: "6OPUAnKyGjrG9uC1pu8jZg",
      date: "01/01/2000",
    };
    await api
      .put(`/api/blogs/${exempleValidId}`)
      .set("Authorization", defaultToken)
      .send(updatedBlog)
      .expect(ErrorTypes.BAD_REQUEST);
  });

  test("PUT /ID : missing date : return BAD_REQUEST", async () => {
    const updatedBlog = {
      content:
        "UPDATED2 : In here goes the contnet of blog . Just for testing : UPDATED2",
      title: "UPDATED2 : Exemple blog for testing : UPDATED2",
      id: "6OPUAnKyGjrG9uC1pu8jZg",
    };
    await api
      .put(`/api/blogs/${exempleValidId}`)
      .set("Authorization", defaultToken)
      .send(updatedBlog)
      .expect(ErrorTypes.BAD_REQUEST);
  });

  test("PUT /WRONG_ID : return NOT_FOUND", async () => {
    const updatedBlog = {
      content:
        "UPDATED2 : In here goes the contnet of blog . Just for testing : UPDATED2",
      title: "UPDATED2 : Exemple blog for testing : UPDATED2",
      id: "6OPUAnKyGjrG9uC1pu8jZg",
    };
    await api
      .put(`/api/blogs/${exempleInvalidId}`)
      .set("Authorization", defaultToken)
      .send(updatedBlog)
      .expect(ErrorTypes.NOT_FOUND);
  });
});

describe("DELETE :", () => {
  test("DELETE /ID : return NO_CONTENT", async () => {
    await api
      .delete(`/api/blogs/${exempleValidId}`)
      .set("Authorization", defaultToken)
      .expect(SuccessType.NoContent);
    const fileRemoved = !FileSystem.existsSync(
      `${env.BLOGS_FOLDER}/${exempleValidId}.json`
    );
    assert.strictEqual(fileRemoved, true);
  });
  test("DELETE /WRONG_ID : return NOT_FOUND", async () => {
    await api
      .delete(`/api/blogs/${exempleInvalidId}`)
      .set("Authorization", defaultToken)
      .expect(ErrorTypes.NOT_FOUND);
  });
});

after(() => {
  const blogsFiles = FileSystem.readdirSync(env.BLOGS_FOLDER);
  for (const file of blogsFiles)
    FileSystem.unlinkSync(`${env.BLOGS_FOLDER}/${file}`);
  FileSystem.rmdirSync(env.BLOGS_FOLDER);
});
