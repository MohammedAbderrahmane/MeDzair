// -------- initial setup
import env from "./helpers/config.js";
import init from "./helpers/init.js";
import logger from "./helpers/logger.js";
import { exit } from "process";
import express from "express";
import "express-async-errors";
import cors from "cors";

try {
  init();
} catch (error) {
  logger.error(`${error.name || error.code} *** ${error.message}`);
  exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// -------- Logger middleware
import { loggerMiddleware, errorLoggerMiddleware } from "./helpers/logger.js";
app.use(loggerMiddleware);
app.use(errorLoggerMiddleware);
// -------- API endpoints
import profileRouter from "./controllers/profile.js";
import blogRouter from "./controllers/blog.js";
import authRouter from "./controllers/auth.js";
import imageRouter from "./controllers/image.js";

app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/image", imageRouter);

// -------- Static files
import fileUpload from "express-fileupload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "dist-ui-client")));
app.use(express.static(path.join(__dirname, env.IMAGES_FOLDER)));

app.get(`${env.IMAGES_FOLDER}/*`, (request, response) => {
  response.sendFile(request.url);
});

app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname, "dist-ui-client/index.html"));
});


// -------- Error middleware
import {
  generalErrorHandler,
  specificErrorHandler,
} from "./helpers/error_middleware.js";

app.use(specificErrorHandler);
app.use(generalErrorHandler);

export default app;
