import { Router, Route } from "@solidjs/router";

import Blog from "./routes/blogs/[id]";
import CreateBlog from "./routes/blogs/new";
import Main from "./routes/";
import Update from "./routes/blogs/update";
import Auth from "./routes/auth";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

function App() {
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
