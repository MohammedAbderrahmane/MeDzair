import { Router, Route } from "@solidjs/router";

import Blog from "./routes/blogs/[id]";
import CreateBlog from "./routes/blogs/new";
import Main from "./routes/";
import About from "./routes/about";
import Update from "./routes/blogs/update";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Route path="/" component={Main} />
        <Route path="/about" component={About} />
        <Route path="/blogs/:id" component={Blog} />
        <Route path="/blogs/new" component={CreateBlog} />
        <Route path="/blogs/update/:id" component={Update} />
      </Router>
      <Footer/>
    </>
  );
}

export default App;
