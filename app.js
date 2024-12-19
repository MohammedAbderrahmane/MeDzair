import express from "express";
import cors from "cors";
import "express-async-errors";

import {
  generalErrorHandler,
  specificErrorHandler,
} from "./helpers/error_middleware.js";
import blogRouter from "./controllers/blog.js";
import { loggerMiddleware } from "./helpers/logger.js";
import authRouter from "./controllers/auth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use(express.static("dist"));
app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);
// app.use("/api");
// app.use("/api");

app.use(specificErrorHandler);
app.use(generalErrorHandler);

export default app;
