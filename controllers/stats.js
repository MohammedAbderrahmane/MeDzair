import express from "express";

import Auth from "../models/Auth.js";
import SuccessTypes from "../helpers/success_types.js";
import Stats from "../models/Stats.js";

const router = express.Router();

// router.use((request, response, next) => {
//   const authorization = request.get("authorization");
//   Auth.verify(authorization);
//   next();
// });

router.get("/general", async (request, response, next) => {
  const user = await Stats.getGeneralStats();
  response.status(SuccessTypes.OK).json(user);
});


export default router;
