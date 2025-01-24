import { Router, Route } from "@solidjs/router";
import { createEffect, useContext } from "solid-js";

import BlogService from "./services/blog.js";
import AuthService from "./services/auth.js";

import Blog from "./routes/blogs/[id]";
import CreateBlog from "./routes/blogs/new";
import Main from "./routes/";
import Update from "./routes/blogs/update";
import Auth from "./routes/auth";
import Profile from "./routes/profile";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";
import "./atom-one-dark.css"

import UserContext from "./reusable_components/Context/user.jsx";

function App() {
  const [user, setUser] = useContext(UserContext);

  createEffect(async () => {
    const localUser = JSON.parse(window.localStorage.getItem("user"));
    if (!localUser) return;
    await AuthService.verifySession(localUser, setUser);
  });

  return (
    <>
      <Header />
      <div className="main">
        <Router>
          {user && user.username ? (
            <>
              <Route path="/" component={Main} />
              <Route path="/profile" component={Profile} />
              <Route path="/blogs/:id" component={Blog} />
              <Route path="/blogs/new" component={CreateBlog} />
              <Route path="/blogs/update/:id" component={Update} />
            </>
          ) : (
            <>
              <Route path="/*" component={Auth} />
            </>
          )}
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
