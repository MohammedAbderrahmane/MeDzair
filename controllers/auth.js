import express from "express";

import Auth from "../models/Auth.js";
import SuccessTypes from "../helpers/success_types.js";

const router = express.Router();

router.post("/", async (request, response) => {
  const { username, password, rememberMe } = request.body;
  const authToken = Auth.login(username, password, rememberMe);

  response.status(SuccessTypes.Accepted).send(authToken);
});

router.get("/verify", async (request, response) => {
  const authorization = request.get("authorization");
  Auth.verify(authorization);
  response.status(SuccessTypes.Accepted).end();
});

export default router;
