import { For } from "solid-js";

function Footer(params) {
  const year = new Date().getFullYear();

  return (
    <footer class="site-footer">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <h2 class="site-footer__logo">~/admin.medzair.com</h2>
          <p class="site-footer__tagline">
            A simple admin space for writing, publishing and managing blog
            posts.
          </p>
        </div>

        <div class="site-footer__columns">
          <For each={columns}>
            {(column) => (
              <div class="site-footer__column">
                <h3 class="site-footer__column-title">{column.title}</h3>
                <ul class="site-footer__links">
                  <For each={column.links}>
                    {(link) => (
                      <li>
                        <a href={link.href}>{link.name}</a>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__copyright">
          &copy; {year} MeDzair. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;