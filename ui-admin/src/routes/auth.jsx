import Notification from "../reusable_components/Notification";
import useNotification from "../reusable_components/Notification/useNotification.js";

function Auth(params) {
  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFailure("Not yet implimented");
    // TODO
  };

  return (
    <div class="login-form">
      <h2>Please Enter your credential:</h2>
      <form>
        <label for="username-input">Username:</label>
        <input type="text" id="username-input" required />

        <label for="password-input">Password:</label>
        <input type="password" id="password-input" required />

        <div class="remember-me-div">
          <input type="checkbox" id="remember-me-input" />
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
