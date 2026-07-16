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

const getCurrentDay = () => new Date().toLocaleString().slice(0, 10);

const getExactCurrentTime = () => new Date().toLocaleString().replace(",", "");

const admin = () =>
  JSON.parse(
    FileSystem.readFileSync(
      `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`
    ).toString()
  );

const getFileNameAndExtention = (fileName) => [
  fileName.replace(/\..*/, ""),
  fileName.substring(fileName.lastIndexOf(".")),
];

const toBase64 = (fileName) => Buffer.from(fileName).toString("base64");

const toMB_KB = (bytes) => {
  if (bytes > (1024 * 1024 * 1024))
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
  if (bytes > (1024 * 1024))
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  else if (bytes > (1024))
    return (bytes / 1024).toFixed(2) + " KB";
  else if (bytes)
    return bytes.toFixed(2) + " B";
  return "-1 B"
}

const toISODate = (dateStr) => {
  if (!dateStr) return undefined;

  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr.slice(0, 10);

  const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (match) {
    const [, day, month, year] = match;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return undefined;
};

export {
  hasAllAttributes,
  CustomError,
  fileExists,
  getCurrentDay,
  admin,
  getFileNameAndExtention,
  getExactCurrentTime,
  toBase64,
  toMB_KB,
  toISODate
};
