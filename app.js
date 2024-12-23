import express from "express";
import cors from "cors";
import "express-async-errors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import {
  generalErrorHandler,
  specificErrorHandler,
} from "./helpers/error_middleware.js";
import blogRouter from "./controllers/blog.js";
import { loggerMiddleware } from "./helpers/logger.js";
import authRouter from "./controllers/auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);

app.use(express.static(path.join(__dirname, "dist-ui-client")));
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "dist-ui-client/index.html"));
});

app.use(specificErrorHandler);
app.use(generalErrorHandler);

export default app;
