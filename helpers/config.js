import dotenv from "dotenv";
import FileSystem from "fs";
import { exit } from "process";
import { logger } from "./logger.js";

dotenv.config();
const env = { ...process.env };

try {
  logger.info("server started");
  if (!FileSystem.existsSync(env.BLOGS_FOLDER))
    FileSystem.mkdirSync(env.BLOGS_FOLDER, { recursive: true });
} catch (error) {
    logger.error(error);
    setTimeout(() => exit(1), 1000);
}

export default env;
