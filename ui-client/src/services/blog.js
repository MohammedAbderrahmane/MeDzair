import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getOne = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { getAll, getOne };
