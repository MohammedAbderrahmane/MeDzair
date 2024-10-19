import CreateBlog from "../components/CreateBlog";
import BlogList from "../components/BlogsList";

function Index(params) {
  return (
    <div>
      <CreateBlog />
      <BlogList />
    </div>
  );
}

export default Index;
