import { Router, Route } from "@solidjs/router";

import Blogs from "./routes/Blogs";
import Blog from "./routes/Blog";
import Main from "./routes/";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Main} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blogs/:id" component={Blog} />
      </Router>
    </>
  );
}

export default App;