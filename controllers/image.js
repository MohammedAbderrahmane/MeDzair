import express from "express";

import Image from "../models/Image.js";
import SuccessTypes from "../helpers/success_types.js";

const router = express.Router();

router.post("/image", async (request, response) => {
  const files = request.files;

  const fileName = await Image.create(files);

  response.status(SuccessTypes.Created).send({ fileName });
});

export default router;
