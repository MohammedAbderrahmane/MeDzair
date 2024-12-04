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

const add = async (blog) => {
  try {
    const response = await axios.post(baseUrl, blog);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const update = async (id, blog) => {
  try {
    const resposne = await axios.put(`${baseUrl}/${id}`, blog);
    return resposne.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { getAll, getOne, add, update, remove };
