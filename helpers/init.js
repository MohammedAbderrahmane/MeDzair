import env from "./config.js";
import { CustomError } from "./helpers.js";
import FileSystem from "fs";

const init = () => {
  if (env.NODE_ENV === "testing") {
    env.WEBSITE_LOCATION = env.WEBSITE_LOCATION_TEST;
    env.CONF_FOLDER = env.CONF_FOLDER_TEST;
    env.BLOGS_FOLDER = env.BLOGS_FOLDER_TEST;
    env.IMAGES_FOLDER = env.IMAGES_FOLDER_TEST;
  }

  const requiredDirs = [
    env.WEBSITE_LOCATION,
    env.CONF_FOLDER,
    env.BLOGS_FOLDER,
    env.IMAGES_FOLDER,
    env.LOGS_FOLDER,
  ];

  for (const dir of requiredDirs) {
    if (dir == undefined)
      throw new CustomError(
        "env variable missing",
        "a critical variable is missing"
      );
    if (!FileSystem.existsSync(dir))
      FileSystem.mkdirSync(dir, { recursive: true });
  }

  const credentialsFile = `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`;
  if (!FileSystem.existsSync(credentialsFile)) {
    const credentials = `{
        "adminUsername": "admin",
        "adminPassword": "$2b$10$ZvwgKIFKlFUZRUhcB9gXbeIO/o8eY1W.cZzsIg8ol2Oi3ehE9dr2i"
      }`;
    FileSystem.writeFileSync(credentialsFile, credentials, "utf-8");
  }
};

export default init;
