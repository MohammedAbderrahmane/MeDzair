import { Router, Route } from "@solidjs/router";

import Blog from "./routes/blogs/[id]";
import Main from "./routes/";
import About from "./routes/about";

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
      </Router>
      <Footer/>
    </>
  );
}

export default App;