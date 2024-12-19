import express from "express";

import Auth from "../models/Auth.js";
import SuccessTypes from "../helpers/success_types.js";

const router = express.Router();

router.post("/", async (request, response, next) => {
  const { username, password, rememberMe } = request.body;
  Auth.login(username, password, rememberMe);

  response.status(SuccessTypes.Accepted).end();
});


export default router