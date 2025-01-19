import axios from "axios";
import Header from "./Header.js";

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

const add = async (blog) => {
  try {
    const response = await axios.post(baseUrl, blog, Header);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const update = async (id, blog) => {
  try {
    const resposne = await axios.put(`${baseUrl}/${id}`, blog, Header);
    return resposne.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`, Header);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { getAll, getOne, add, update, remove };
