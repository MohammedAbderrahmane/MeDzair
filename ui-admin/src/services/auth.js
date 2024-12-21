import axios from "axios";

const baseUrl = "/api/auth";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data; // authToken
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const verifySession = async (authToken) => {
  const options = { headers: { Authorization: authToken } };
  try {
    await axios.get(`${baseUrl}/verify`, options);
    return true;
  } catch (error) {
    return false;
  }
};

export default { login, verifySession };
