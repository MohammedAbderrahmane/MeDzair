import axios from "axios";

const baseUrl = "/api/auth";

const login = async (credentials) => {
  try {
    await axios.post(baseUrl, credentials);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { login };
