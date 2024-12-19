import dotenv from "dotenv";
import FileSystem from "fs";
import { exit } from "process";
import { logger } from "./logger.js";

dotenv.config();
const env = { ...process.env };

if (env.NODE_ENV == "testing") {
  env.WEBSITE_LOCATION = env.WEBSITE_LOCATION_TEST;
  env.CONF_FOLDER = env.CONF_FOLDER_TEST;
  env.BLOGS_FOLDER = env.BLOGS_FOLDER_TEST;
}

if (env.NODE_ENV != "testing") {
  const defaultCredentials = `{
  "adminUsername": "admin",
  "adminPassword": "$2b$10$ZvwgKIFKlFUZRUhcB9gXbeIO/o8eY1W.cZzsIg8ol2Oi3ehE9dr2i"
}`;
  if (!FileSystem.existsSync(`${env.CONF_FOLDER}`)) {
    FileSystem.mkdirSync(`${env.CONF_FOLDER}`, { recursive: true });
    FileSystem.writeFileSync(
      `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`,
      defaultCredentials,
      "utf-8"
    );
  } else if (
    !FileSystem.existsSync(`${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`)
  ) {
    FileSystem.writeFileSync(
      `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`,
      defaultCredentials,
      "utf-8"
    );
  }
}

try {
  logger.info("server started");
  if (!FileSystem.existsSync(env.BLOGS_FOLDER))
    FileSystem.mkdirSync(env.BLOGS_FOLDER, { recursive: true });
} catch (error) {
  logger.error(error);
  setTimeout(() => exit(1), 1000);
}

export default env;
