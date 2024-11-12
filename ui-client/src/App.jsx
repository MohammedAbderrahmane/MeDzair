import { Router, Route } from "@solidjs/router";

import Blog from "./routes/blog";
import Main from "./routes/main";
import About from "./routes/about";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorDiv from "./reusable_components/ErrorDiv";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="main">
        <Router>
          <Route path="/" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/blogs/:id" component={Blog} />
          <Route path="*" component={ErrorDiv} />
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
