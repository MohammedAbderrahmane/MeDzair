import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    const newError = new Error(error.response?.data?.error || "Network error");
    newError.status = error.response.status;
    throw newError;
  }
};

const getOne = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    const newError = new Error(error.response?.data?.error || "Network error");
    newError.status = error.response.status;
    throw newError;
  }
};

const addView = async (id) => {
  const options = { headers: { "blog-id": id } };
  try {
    const response = await axios.post(`${baseUrl}/view/${id}`, null, options);
    return response.data;
  } catch (error) {
    const newError = new Error(error.response?.data?.error || "Network error");
    newError.status = error.response.status;
    throw newError;
  }
};

export default { getAll, getOne, addView };
