import { createResource, createSignal, useContext } from "solid-js";
import UserContext from "../reusable_components/Context/user";
import { createStore } from "solid-js/store";
import ProfileService from "../services/profile";
import AuthService from "../services/auth";

import useNotification from "../reusable_components/Notification/useNotification";
import Notification from "../reusable_components/Notification";
import Resource from "../reusable_components/Resource";

function Profile(params) {
  const [user] = useContext(UserContext);

  const [info, { mutate, refetch }] = createResource(
    async () => await ProfileService.get(user.authToken)
  );

  return (
    <div class="profile-page">
      <h2>User Profile</h2>
      <form class="blocks-form">
        <Resource
          resource={info}
          RenderComponent={(resource) => (
            <Informations info={resource} mutate={mutate} refetch={refetch} />
          )}
        />

        <ChangePassword />
      </form>
    </div>
  );
}

function Informations({ info, mutate, refetch }) {
  const [user, setUser] = useContext(UserContext);
  const [isModifying, setIsModifying] = createSignal(false);

  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const handleUpadteInfo = async (event) => {
    event.preventDefault();
    setLoading();
    try {
      await ProfileService.update(info, user.authToken);
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

  return (
    <fieldset>
      <legend>Your informations :</legend>
      <label for="username">Username:</label>
      <input
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
        disabled={!isModifying()}
      />

      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        value={info.email}
        onInput={(event) =>
          mutate((info) => {
            info.email = event.currentTarget.value;
            return info;
          })
        }
        required
        disabled={!isModifying()}
      />
      <Notification status={notification} />

      <div class="row">
        <button
          class={!isModifying() ? "btn btn-wide" : "btn "}
          onClick={(event) => {
            event.preventDefault();
            setIsModifying(!isModifying());
          }}
        >
          Update Profile
        </button>
        {isModifying() && (
          <button class="btn" type="submit" onClick={handleUpadteInfo}>
            save modifications
          </button>
        )}
      </div>
    </fieldset>
  );
}

function ChangePassword(params) {
  const [user] = useContext(UserContext);

  const [password, setPassword] = createStore({
    password: "",
  });

  const { notification, setSuccess, setFailure, setLoading } =
    useNotification();

  const [isModifyingPassword, setIsModifyingPassword] = createSignal(false);

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
    <fieldset>
      <legend>Modifying password</legend>
      <button
        class="btn btn-wide"
        onClick={(event) => {
          event.preventDefault();
          setIsModifyingPassword(!isModifyingPassword());
        }}
      >
        modify password
      </button>
      {isModifyingPassword() && (
        <div class="blocks-form">
          <label for="password">New password:</label>
          <input
            type="password"
            id="password"
            required
            onInput={(event) =>
              setPassword("password", event.currentTarget.value)
            }
          />
          <label for="confirm-password">Confirm password:</label>
          <input type="password" id="confirm-password" required />
          <Notification status={notification} />
          <button class="btn btn-wide" onClick={handlePassword}>
            Save new password
          </button>
        </div>
      )}
    </fieldset>
  );
}

export default Profile;
