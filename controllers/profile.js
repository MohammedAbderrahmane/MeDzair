import express from "express";

import Auth from "../models/Auth.js";
import SuccessTypes from "../helpers/success_types.js";
import Profile from "../models/Profile.js";

const router = express.Router();

router.use((request, response, next) => {
  const authorization = request.get("authorization");
  Auth.verify(authorization);
  next();
});

router.get("/", async (request, response, next) => {
  const user = Profile.get();
  response.status(SuccessTypes.OK).json(user);
});

router.put("/", async (request, response, next) => {
  const user = request.body;

  Profile.update(user);

  response.status(SuccessTypes.OK).end();
});

export default router;
