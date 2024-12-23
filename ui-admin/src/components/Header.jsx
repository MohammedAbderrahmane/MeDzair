import { For, Show, useContext } from "solid-js";

import UserContext from "../reusable_components/Context/user.jsx";
import AuthService from "../services/auth.js";

function Header({ navItems }) {
  const [user, setUser] = useContext(UserContext);

  const links = navItems || [
    { name: "home", href: "/" },
    { name: "new blog", href: "/blogs/new" },
  ];
  const handleLog = () => {
    AuthService.disconnect(setUser);
    window.location.href = "/auth";
  };

  return (
    <header style={{ border: "solid" }}>
      <div>
        <h1 className="tiny5-regular">
          <a href="/">~/admin.medzair.com</a>
        </h1>
        <span>
          Welcome <b>{user.username}</b> to the Dashboard
        </span>
      </div>
      <nav>
        <ul>
          <For each={links}>
            {(link) => (
              <li>
                <a href={link.href}>{link.name}</a>
              </li>
            )}
          </For>
          <Show when={user}>
            <li>
              <button class="btn-ancher" onClick={handleLog}>
                logout
              </button>
            </li>
          </Show>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
