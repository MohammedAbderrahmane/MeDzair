import axios from "axios";
import Header from "./Header.js";

const baseUrl = "/api/profile";

const update = async (profile) => {
  try {
    await axios.put(baseUrl, { ...profile }, Header);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
const get = async () => {
  try {
    const response = await axios.get(baseUrl, Header);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { get, update };
