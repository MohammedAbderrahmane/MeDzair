const options = { headers: { Authorization: "token" } };

const setUpHeaders = (newAuthToken) => {
  options.headers.Authorization = `Bearer ${newAuthToken}`;
};

export default options;
export { setUpHeaders };
