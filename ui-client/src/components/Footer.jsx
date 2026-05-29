import { For } from "solid-js";

function Footer(params) {
  const email = "louriachiabderrahman13@gmail.com";
  const links = [
    { name: "home", href: "/" },
    { name: "blogs", href: "/blogs" },
    { name: "new blog", href: "/blogs/new" },
    { name: "about", href: "/about" },
  ];

  return (
    <footer>
      <h5>© 2026 | contact : {email}</h5>
    </footer>
  );
}

export default Footer;
