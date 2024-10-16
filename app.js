import express from "express";
import cors from "cors";
import "express-async-errors";

import {
  generalErrorHandler,
  specificErrorHandler,
} from "./helpers/error_middleware.js";
import blogRouter from "./controllers/blog.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
// app.use("/api");
// app.use("/api");
// app.use("/api");

app.use(specificErrorHandler);
app.use(generalErrorHandler);

export default app;
