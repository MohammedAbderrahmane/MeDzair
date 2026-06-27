import env from "../helpers/config.js";
import path from "path";

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
  const encodedName = `${toBase64(fileName)}${extention}`;
  const filePath = path.join(env.IMAGES_FOLDER, encodedName);

  console.log(fileName);
  

  await image.mv(filePath);

  return `/api/image/${toBase64(fileName)}${extention}`;
};


export default Image
