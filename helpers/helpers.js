import FileSystem from "fs";

const hasAllAttributes = (object, wantedAttributes) =>
  wantedAttributes.every(
    (attribute) => attribute in object && object.attribute != ""
  );

class CustomError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
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

export { hasAllAttributes, CustomError, fileExists, getCurrentDay };
