import { For } from "solid-js";

function Footer(params) {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Navigate",
      links: [
        { name: "Home", href: "/" },
        { name: "Blogs", href: "/blogs" },
        { name: "New blog", href: "/blogs/new" },
        { name: "Stats", href: "/stats" },
      ],
    },
    {
      title: "Account",
      links: [
        { name: "Profile", href: "/profile" },
        { name: "Login", href: "/auth" },
      ],
    },
    {
      title: "More",
      links: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer class="site-footer">
      <div class="site-footer__bottom">
        <p class="site-footer__copyright">
          &copy; {year} MeDzair. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
