import { For } from "solid-js";

function Header({ navItems }) {
  const links = navItems || [
    { name: "home", href: "/" },
    { name: "new blog", href: "/blogs/new" },
  ];

  return (
    <header style={{ border: "solid" }}>
      <div>
        <h1 className="tiny5-regular">
          <a href="/">~/admin.medzair.com</a>
        </h1>
        <span>Welcome Mohammed to the Dashboard</span>
      </div>
      <nav>
        <ul>
          <For each={links}>
            {(link) => (
              <li>
                <a href={link.href}>{link.name}</a>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
