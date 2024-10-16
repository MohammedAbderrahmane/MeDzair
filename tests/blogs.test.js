import { before, beforeEach, describe, test, todo } from "node:test";
import assert from "node:assert";
import supertest from "supertest";

import app from "../app.js";
const api = supertest(app);

before(() => {});

describe("Blogs API tests :", () => {
  todo("FORALL / : have no permission : return NO_PERMISSION");
  todo("FORALL / : www doesn't exists : return DIR_NOT_FOUND");

  describe("GET :", () => {
    todo("GET / : return ALL", () => {});
    todo("GET / : empty dir : return []");
    todo("GET /ID : return ONE");
    todo("GET /WRONG_ID : return NOT_FOUND");
  });

  describe("POST :", () => {
    test("normal", async () => {
      const newBlog = {
        title: "You can't quantify the circuit of primary SSD program!",
        content: "non-volatile",
      };
      const result1 = await api.post("/api/blogs").send(newBlog).expect(201);
      assert.strictEqual(result1.body.title, newBlog.title);
      assert.strictEqual(result1.body.content, newBlog.content);
      const result2 = await api
        .get(`/api/blogs/${result1.body.id}`)
        .expect(200);
      assert.strictEqual(result2.body.title, newBlog.title);
      assert.strictEqual(result2.body.content, newBlog.content);
    });
    test("with missing title : return BAD_REQUEST", async () => {
      const newBlog = {
        content: "non-volatile",
      };
      await api.post("/api/blogs").send(newBlog).expect(400);
    });
    test("with missing content : return BAD_REQUEST", async () => {
      const newBlog = {
        title: "You can't quantify the circuit of primary SSD program!",
      };
      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  todo("PUT /ID : return blog & blog updated");
  todo("PUT /ID : add updateDate");
  todo("PUT /ID : with missing title : return BAD_REQUEST");
  todo("PUT /ID : with missing content : return BAD_REQUEST");
  todo("PUT /WRONG_ID : return NOT_FOUND");

  todo("DELETE /ID : return 204");
  todo("DELETE /WRONG_ID : return NOT_FOUND");
});

after(() => {});
