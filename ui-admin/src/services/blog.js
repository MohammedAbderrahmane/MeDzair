import axios from "axios";

const baseUrl = "/api/blogs";
const options = { headers: { Authorization: "token" } };
const setUpHeaders = (newAuthToken) => {
  options.headers.Authorization = `Bearer ${newAuthToken}`;
};

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

const add = async (blog) => {
  try {
    const response = await axios.post(baseUrl, blog, options);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const update = async (id, blog) => {
  try {
    const resposne = await axios.put(`${baseUrl}/${id}`, blog, options);
    return resposne.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`, options);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { getAll, getOne, add, update, remove, setUpHeaders };
