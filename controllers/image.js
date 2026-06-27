import express from "express";
import env from "../helpers/config.js";

import Image from "../models/Image.js";
import SuccessTypes from "../helpers/success_types.js";

const router = express.Router();

router.use("/", express.static(env.IMAGES_FOLDER));


router.post("/", async (request, response) => {
  const files = request.files;

  const fileName = Image.create(files);

  response.status(SuccessTypes.Created).send({ fileName });
});

export default router;
