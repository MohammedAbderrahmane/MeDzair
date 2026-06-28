import { useNavigate } from "@solidjs/router";
import { useContext, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import Notification from "../../reusable_components/Notification/index.jsx";
import useNotification from "../../reusable_components/Notification/useNotification.js";

import UserContext from "../../reusable_components/Context/user.jsx";
import AuthService from "../../services/auth.js";
import "./.css";

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

  const [cursorOn, setCursorOn] = createSignal(true);

  onMount(() => {
    const blink = setInterval(() => setCursorOn((v) => !v), 600);
    return () => clearInterval(blink);
  });

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
    <div class="auth-page">
      <div class="auth-panel">
        <div class="auth-panel__prompt">
          <span class="auth-panel__chevron">&gt;</span> ~/admin.medzair.com
          <span class={`auth-panel__cursor ${cursorOn() ? "is-on" : ""}`}>
            &nbsp;
          </span>
        </div>
        <p class="auth-panel__line">
          <span class="auth-panel__dim"># </span>authenticate to continue
        </p>
        <p class="auth-panel__line">
          <span class="auth-panel__dim"># </span>manage posts, media and profile
          settings
        </p>
        <div class="auth-panel__grid" aria-hidden="true"></div>
      </div>

      <div class="auth-form-side">
        <form class="auth-form" onSubmit={handleSubmit}>
          <h2 class="auth-form__title">sign in</h2>
          <p class="auth-form__subtitle">
            Enter your credentials to access the dashboard.
          </p>

          <label class="auth-form__label" for="username-input">
            Username
          </label>
          <input
            class="auth-form__input"
            type="text"
            id="username-input"
            placeholder="your username"
            autocomplete="username"
            required
            onInput={(event) => setLogin("username", event.currentTarget.value)}
          />

          <label class="auth-form__label" for="password-input">
            Password
          </label>
          <input
            class="auth-form__input"
            type="password"
            id="password-input"
            placeholder="your password"
            autocomplete="current-password"
            required
            onInput={(event) => setLogin("password", event.currentTarget.value)}
          />

          <div class="auth-form__row">
            <label class="auth-form__checkbox-label" for="remember-me-input">
              <input
                type="checkbox"
                id="remember-me-input"
                onInput={(event) =>
                  setLogin("rememberMe", event.currentTarget.checked)
                }
              />
              Remember me
            </label>
          </div>

          <Notification status={notification} />

          <button class="btn btn-wide auth-form__submit" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
