import { useNavigate } from "@solidjs/router";
import { useContext } from "solid-js";
import { createStore } from "solid-js/store";

import Notification from "../reusable_components/Notification";
import useNotification from "../reusable_components/Notification/useNotification.js";

import UserContext from "../reusable_components/Context/user.jsx";
import AuthService from "../services/auth.js";

function Auth(params) {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [login, setLogin] = createStore({
    username: "",
    password: "",
    rememberMe: false,
  });

  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading();
    try {
      const authToken = await AuthService.login(login);
      setSuccess("Suceess");
      
      setTimeout(() => {
        const username = login.username;
        AuthService.connect(setUser, { username, authToken });
        navigate("/");
      }, 1000);
    } catch (error) {
      setFailure(error.message);
    }
  };

  return (
    <div class="login-page">
      <h2>Please Enter your credential:</h2>
      <form>
        <label for="username-input">Username:</label>
        <input
          type="text"
          id="username-input"
          required
          onInput={(event) => setLogin("username", event.currentTarget.value)}
        />

        <label for="password-input">Password:</label>
        <input
          type="password"
          id="password-input"
          required
          onInput={(event) => setLogin("password", event.currentTarget.value)}
        />

        <div class="remember-me-div">
          <input
            type="checkbox"
            id="remember-me-input"
            onInput={(event) =>
              setLogin("rememberMe", event.currentTarget.checked)
            }
          />
          <label for="remember-me-input">Remember Me</label>
        </div>
        <Notification status={notification} />
        <button class="btn btn-wide" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Auth;
