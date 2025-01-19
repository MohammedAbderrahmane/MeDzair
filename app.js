import fileUpload from "express-fileupload";
import env from "./helpers/config.js";
import "express-async-errors";
import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import {
  generalErrorHandler,
  specificErrorHandler,
} from "./helpers/error_middleware.js";
import { loggerMiddleware } from "./helpers/logger.js";

import profileRouter from "./controllers/profile.js";
import blogRouter from "./controllers/blog.js";
import authRouter from "./controllers/auth.js";
import imageRouter from "./controllers/image.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, "dist-ui-client")));
app.use(express.static(path.join(__dirname, env.IMAGES_FOLDER)));

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(fileUpload());

app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/image", imageRouter);

app.get(`${env.IMAGES_FOLDER}/*`, (request, response) => {
  response.sendFile(request.url);
});
app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname, "dist-ui-client/index.html"));
});

app.use(specificErrorHandler);
app.use(generalErrorHandler);

export default app;
