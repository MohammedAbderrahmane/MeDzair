import { For } from "solid-js";

function Footer(params) {
  const links = [
    { name: "home", href: "/" },
    { name: "blogs", href: "/blogs" },
    { name: "new blog", href: "/blogs/new" },
    { name: "about", href: "/about" },
  ];

  return (
    <footer>
        <h6>all copy right reserved</h6>
    </footer>
  );
}

export default Footer
