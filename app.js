// -------- initial setup
import env from "./helpers/config.js";
import init from "./helpers/init.js";
import logger from "./helpers/logger.js";
import { exit } from "process";
import express from "express";
import "express-async-errors";
import cors from "cors";
import {
  isCrawler,
  renderBlogHtml,
  renderMainHtml,
} from "./helpers/crawler.js";
import { toISODate } from "./helpers/helpers.js";
import Blog from "./models/Blog.js";

try {
  init();
} catch (error) {
  logger.error(`${error.name || error.code} *** ${error.message}`);
  exit(1);
}

const app = express();
app.set("trust proxy", "loopback");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } }));


// -------- Logger middleware
import { loggerMiddleware, errorLoggerMiddleware } from "./helpers/logger.js";
app.use(loggerMiddleware);
app.use(errorLoggerMiddleware);
// -------- API endpoints
import profileRouter from "./controllers/profile.js";
import blogRouter from "./controllers/blog.js";
import authRouter from "./controllers/auth.js";
import imageRouter from "./controllers/image.js";
import statsRouter from "./controllers/stats.js";

app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/image", imageRouter);
app.use("/api/stats", statsRouter);

// -------- Static files
import fileUpload from "express-fileupload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (env.NODE_ENV === "production") {
  // Admin UI — must come first, and be scoped to /admin
  app.use("/admin", express.static(path.join(__dirname, "dist-ui-admin")));
  app.get("/admin/*", (request, response) => {
    response.sendFile(path.join(__dirname, "dist-ui-admin/index.html"));
  });

  // Client UI — catch-all, must come last
  // --- Prerender the home page, crawlers only ---
  app.get("/", (request, response, next) => {
    const userAgent = request.get("user-agent") || "";
    if (!isCrawler(userAgent)) return next();

    try {
      const blogs = Blog.getAll();
      const baseUrl = `${request.protocol}://${request.get("host")}`;
      response.status(200).send(renderMainHtml(blogs, baseUrl));
    } catch (error) {
      console.log(error);

      next();
    }
  });

  app.get("/sitemap.xml", (request, response) => {
    const blogs = Blog.getAll();
    const baseUrl = `${request.protocol}://${request.get("host")}`;

    const urls = [
      `<url><loc>${baseUrl}/</loc><changefreq>daily</changefreq></url>`,
      ...blogs.map(
        (blog) =>
          `<url><loc>${baseUrl}/blogs/${blog.id}</loc><lastmod>${toISODate(blog.updateDate || blog.date)}</lastmod></url>`,
      ),
    ].join("\n");

    response.type("application/xml").send(
      `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
       </urlset>`,
    );
  });

  // --- Prerender single blog pages, crawlers only ---
  app.get("/blogs/:id", (request, response, next) => {
    const userAgent = request.get("user-agent") || "";
    if (!isCrawler(userAgent)) return next();

    try {
      const blog = Blog.getOne(request.params.id);
      const baseUrl = `${request.protocol}://${request.get("host")}`;
      response.status(200).send(renderBlogHtml(blog, baseUrl));
    } catch (error) {
      console.log(error);

      next();
    }
  });

  // Client UI — catch-all, must come last
  app.use(express.static(path.join(__dirname, "dist-ui-client")));
  app.get("/*", (request, response) => {
    response.sendFile(path.join(__dirname, "dist-ui-client/index.html"));
  });
}

// -------- Error middleware
import {
  generalErrorHandler,
  specificErrorHandler,
} from "./helpers/error_middleware.js";

app.use(specificErrorHandler);
app.use(generalErrorHandler);

export default app;
