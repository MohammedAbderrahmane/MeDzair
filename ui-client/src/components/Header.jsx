import { For } from "solid-js";

function Header({ navItems }) {
  const links = navItems || [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
  ];

  return (
    <header>
      <h1>Welcome to my website</h1>
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
