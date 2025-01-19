import axios from "axios";
import Header from "./Header.js";

const baseUrl = "/api/image";

const uploadimage = async (image) => {
  try {
    const response = await axios.post(`${baseUrl}/image`, image, Header);
    return response.data.fileName;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
};

export default { uploadimage };
