import { useNavigate } from "@solidjs/router";
import { useContext } from "solid-js";

import Notification from "../reusable_components/Notification";
import useNotification from "../reusable_components/Notification/useNotification.js";

import UserContext from "../reusable_components/Context/user.jsx";
import AuthService from "../services/auth.js";

function Auth(params) {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading();
    try {
      await AuthService.login(user);
      setSuccess("Suceess");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setFailure(error.message);
    }
  };

  return (
    <div class="login-form">
      <h2>Please Enter your credential:</h2>
      <form>
        <label for="username-input">Username:</label>
        <input
          type="text"
          id="username-input"
          required
          onInput={(event) => setUser("username", event.currentTarget.value)}
        />

        <label for="password-input">Password:</label>
        <input
          type="password"
          id="password-input"
          required
          onInput={(event) => setUser("password", event.currentTarget.value)}
        />

        <div class="remember-me-div">
          <input
            type="checkbox"
            id="remember-me-input"
            onInput={(event) =>
              setUser("rememberMe", event.currentTarget.checked)
            }
          />
          <label for="remember-me-input">Remember Me</label>
        </div>
        <Notification status={notification} />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Auth;
