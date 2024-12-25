import axios from "axios";

const baseUrl = "/api/profile";

const update = async (profile, Authorization) => {
  const options = { headers: { Authorization } };
  try {
    await axios.put(baseUrl, { ...profile }, options);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
const get = async (Authorization) => {
  const options = { headers: { Authorization } };
  try {
    const response = await axios.get(baseUrl, options);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { get, update };
