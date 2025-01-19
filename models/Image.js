import env from "../helpers/config.js";

import {
  CustomError,
  getFileNameAndExtention,
  toBase64,
} from "../helpers/helpers.js";


const Image = {
  create: () => {},
};

Image.create = async (files) => {
  if (!files || Object.keys(files).length === 0)
    throw new CustomError("BAD_REQUEST", "no files were uploaded");

  const image = files.image;

  const [fileName, extention] = getFileNameAndExtention(image.name);
  const newFileLocation = `${env.IMAGES_FOLDER}/${toBase64(
    fileName
  )}${extention}`;
  await image.mv(`${newFileLocation}`);
  return `${env.IMAGES_FOLDER}/${toBase64(fileName)}${extention}`;
};

export default Image;
