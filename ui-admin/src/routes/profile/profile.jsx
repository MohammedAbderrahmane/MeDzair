import { createResource, createSignal, useContext } from "solid-js";
import UserContext from "../../reusable_components/Context/user";
import { createStore } from "solid-js/store";
import ProfileService from "../../services/profile";
import AuthService from "../../services/auth";

import useNotification from "../../reusable_components/Notification/useNotification";
import Notification from "../../reusable_components/Notification";
import Resource from "../../reusable_components/Resource";
import "./.css";

function Profile(params) {
  const [info, { mutate, refetch }] = createResource(
    async () => await ProfileService.get(),
  );

  return (
    <>
      <h1 className="blogs-page__title">User Profile</h1>
      <form class="blocks-form fields">
        <Resource
          resource={info}
          RenderComponent={(resource) => (
            <Informations info={resource} mutate={mutate} refetch={refetch} />
          )}
        />
      </form>
    </>
  );
}

function Informations({ info, mutate, refetch }) {
  const [user, setUser] = useContext(UserContext);

  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handleUpadteInfo = async (event) => {
    event.preventDefault();
    setLoading();
    try {
      await ProfileService.update(info);
      if (info.username != user.username) {
        setSuccess("Suceess, You will be disconnected shortly");
        setTimeout(() => AuthService.disconnect(setUser), 2000);
        return;
      }
      setSuccess("Suceess");
    } catch (error) {
      setFailure(error.message);
    }
  };

  console.log(notification);

  return (
    <form className="fields">
      <label className="auth-form__label" for="username">
        Username:
      </label>
      <input
        className="auth-form__input"
        type="text"
        id="username"
        value={info.username}
        onInput={(event) =>
          mutate((info) => {
            info.username = event.currentTarget.value;
            return info;
          })
        }
        required
      />

      <Notification status={notification} />

      <div class="row">
        <button class="btn btn-wide" type="submit" onClick={handleUpadteInfo}>
          save modifications
        </button>
      </div>
      <ChangePassword />
    </form>
  );
}

function ChangePassword(params) {
  const [user] = useContext(UserContext);

  const [password, setPassword] = createStore({
    password: "",
  });

  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handlePassword = async (event) => {
    event.preventDefault();
    setLoading();
    try {
      await ProfileService.update(password, user.authToken);
      setSuccess("Suceess");
    } catch (error) {
      setFailure(error.message);
    }
  };

  return (
    <>
      <label className="auth-form__label" for="password">
        New password:
      </label>
      <input
        className="auth-form__input"
        type="password"
        id="password"
        required
        onInput={(event) => setPassword("password", event.currentTarget.value)}
      />
      <label className="auth-form__label" for="confirm-password">
        Confirm password:
      </label>
      <input
        className="auth-form__input"
        type="password"
        id="confirm-password"
        required
      />
      <Notification status={notification} />
      <button class="btn btn-wide" onClick={handlePassword}>
        Save new password
      </button>
    </>
  );
}

export default Profile;
