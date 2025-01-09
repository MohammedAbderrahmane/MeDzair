const viewString = (viewCount) => {
  if (viewCount == undefined || viewCount == 0) return "no views";
  return viewCount > 1 ? `${viewCount} views` : "1 view";
};

function BlogCard({ blog }) {
  return (
    <li className="blog-card">
      <a className="break-line" href={`/blogs/${blog.id}`}>{blog.title}</a>
      <span>{blog.date}</span>
      <span>{viewString(blog.viewCount)}</span>
    </li>
  );
}

export default BlogCard;
