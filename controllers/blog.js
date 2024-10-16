import express from "express";

import Blog from "../models/Blog.js";
import SuccessTypes from "../helpers/success_types.js";

const router = express.Router();

router.get("/", async (request, response, next) => {
  const a = Blog.getAll();
  response.status(SuccessTypes.OK).send(a);
});

router.get("/:id", async (request, response, next) => {
  const { id } = request.params;
  const blog = Blog.getOne(id);
  response.status(SuccessTypes.OK).json(blog);
});

// TODO : add authentification to updates
router.post("/", async (request, response, next) => {
  const body = request.body;
  const blog = Blog.create(body);
  response.status(SuccessTypes.Created).json(blog);
});

router.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  const body = request.body;
  const blog = Blog.update(id, body);
  response.status(SuccessTypes.OK).json(blog);
});

router.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  Blog.delete(id);
  response.status(SuccessTypes.NoContent).end();
});

export default router;
