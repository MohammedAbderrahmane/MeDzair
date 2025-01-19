import axios from "axios";
import Header, { setUpHeaders } from "./Header.js";

const baseUrl = "/api/auth";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data; // authToken
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const verifySession = async (localUser, setUser) => {
  const options = { headers: { Authorization: localUser.authToken } };
  try {
    await axios.get(`${baseUrl}/verify`, options);

    setUser(localUser);
    setUpHeaders(localUser.authToken);
    console.log(localUser.authToken);

    return true;
  } catch (error) {
    disconnect(setUser);
    return false;
  }
};

const connect = (setUser, user) => {
  setUpHeaders(user.authToken);
  window.localStorage.setItem("user", JSON.stringify(user));
  setUser(user);
};

const disconnect = (setUser) => {
  window.localStorage.removeItem("user");
  setUser(null);
  window.location.href = "/auth";
};

export default { login, verifySession, connect, disconnect };
