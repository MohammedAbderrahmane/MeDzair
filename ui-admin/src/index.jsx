import { UserProvider } from "./reusable_components/Context/user.jsx";
import { render } from "solid-js/web";

import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <UserProvider>
      <App />
    </UserProvider>
  ),
  root
);
