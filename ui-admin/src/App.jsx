import { Router, Route } from "@solidjs/router";
import { createEffect, useContext } from "solid-js";

import BlogService from "./services/blog.js";
import AuthService from "./services/auth.js";

import Blog from "./routes/blogs/[id]";
import CreateBlog from "./routes/blogs/new";
import Main from "./routes/";
import Update from "./routes/blogs/update";
import Auth from "./routes/auth";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

import UserContext from "./reusable_components/Context/user.jsx";

function App() {
  const [user, setUser] = useContext(UserContext);

  createEffect(async () => {
    const localUser = JSON.parse(window.localStorage.getItem("user"));
    if (!localUser && !window.location.href.includes("/auth")) {
      window.location.href = "/auth";
      return;
    }
    if (localUser && !(await AuthService.verifySession(localUser.authToken))) {
      window.localStorage.removeItem("user");
      window.location.href = "/auth";
      return;
    }
    setUser(localUser);
    console.log(localUser.authToken);
    BlogService.setUpHeaders(localUser.authToken);
  });

  return (
    <>
      <Header />
      <div className="main">
        <Router>
          <Route path="/" component={Main} />
          <Route path="/auth" component={Auth} />
          <Route path="/blogs/:id" component={Blog} />
          <Route path="/blogs/new" component={CreateBlog} />
          <Route path="/blogs/update/:id" component={Update} />
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
