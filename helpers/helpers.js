import FileSystem from "fs";
import env from "./config.js";

const hasAllAttributes = (object, wantedAttributes) =>
  wantedAttributes.every(
    (attribute) => attribute in object && object[attribute].length > 0
  );

class CustomError extends Error {
  constructor(name, message) {
    super(message);
    this.code = name;
  }
}

const fileExists = (filePath) => {
  try {
    FileSystem.statSync(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

const getCurrentDay = () =>
  new Date().toISOString().slice(0, 10).split("-").reverse().join("/");

const admin = () =>
  JSON.parse(
    FileSystem.readFileSync(
      `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`
    ).toString()
  );

export { hasAllAttributes, CustomError, fileExists, getCurrentDay, admin };
