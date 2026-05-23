import { For } from "solid-js";

function Header({ navItems }) {
  const links = navItems || [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
  ];

  return (
    <header>
      <div>
        <h1 className="tiny5-regular">
          <a href="/">~/medzair.com</a>
        </h1>
        <span>Stories that stick'nt. Ideas that do no sparks.</span>
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
