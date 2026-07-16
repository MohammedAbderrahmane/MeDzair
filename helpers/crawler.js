const CRAWLER_REGEX =
  /bot|googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|crawler|spider|facebookexternalhit|twitterbot|linkedinbot|slackbot|telegrambot|whatsapp|discordbot|pinterest|redditbot|applebot|embedly|quora link preview|w3c_validator/i;

export const isCrawler = (userAgent = "") => {
  console.log("ssssssssssssssssssss : " - CRAWLER_REGEX.test(userAgent));

  return CRAWLER_REGEX.test(userAgent);
};

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const stripTags = (html = "") =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const renderBlogHtml = (blog, baseUrl) => {
  const title = escapeHtml(blog.title);
  const description = blog.subTitle;
  const url = `${baseUrl}/blogs/${blog.id}`;

  const tags = blog.tags || [];

  const keywordsTag = tags.length
    ? `<meta name="keywords" content="${escapeHtml(tags.join(", "))}" />`
    : "";

  const articleTagsMeta = tags
    .map(
      (tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`,
    )
    .join("\n  ");

  const tagsList = tags.length
    ? `<ul class="tags">
        ${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("\n        ")}
      </ul>`
    : "";

  return `
        <!doctype html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <title>${title} — MeDzair</title>
        <meta name="description" content="${description}" />
        ${keywordsTag}
        <link rel="canonical" href="${url}" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:url" content="${url}" />
        ${articleTagsMeta}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        </head>
        <body>
        <article>
            <h1>${title}</h1>
            <sub>${escapeHtml(blog.date)}</sub>
            ${tagsList}
            <div>${blog.content}</div>
        </article>
        </body>
        </html>`;
};

export const renderMainHtml = (blogs, baseUrl) => {
  const description =
    "Stories that don't stick. Ideas that don't spark. A blog about programming and networking.";

  const sorted = [...blogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const allTags = [...new Set(sorted.flatMap((blog) => blog.tags || []))];
  const keywordsTag = allTags.length
    ? `<meta name="keywords" content="${escapeHtml(allTags.join(", "))}" />`
    : "";

  const listItems = sorted
    .map((blog) => {
      const title = escapeHtml(blog.title);
      const url = `${baseUrl}/blogs/${blog.id}`;
      const tags = blog.tags || [];
      const tagsList = tags.length
        ? `<ul class="tags">
            ${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("\n            ")}
          </ul>`
        : "";

      return `<li>
        <a href="${url}">${title}</a>
        <sub>${escapeHtml(blog.date)}</sub>
        ${tagsList}
      </li>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>~/medzair.com</title>
  <meta name="description" content="${description}" />
  ${keywordsTag}
  <link rel="canonical" href="${baseUrl}/" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="~/medzair.com" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${baseUrl}/" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="~/medzair.com" />
  <meta name="twitter:description" content="${description}" />
</head>
<body>
  <header>
    <h1>~/medzair.com</h1>
    <p>${description}</p>
  </header>
  <main>
    <ul>
${listItems}
    </ul>
  </main>
</body>
</html>`;
};