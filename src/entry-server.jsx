// src/entry-server.jsx
// Used only at build time by scripts/prerender.js. Never loaded in the browser.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { indexablePaths } from "./data/seo";

/**
 * Every URL that gets its own static HTML file. The list lives in
 * src/data/seo.js (12 static pages + one page per treatment), so the prerender,
 * the sitemap and the page titles can never get out of step.
 */
export const routes = indexablePaths();

export function render(url) {
  const helmetContext = {};

  const html = renderToString(
    <StaticRouter location={url}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </StaticRouter>,
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [helmet.title, helmet.priority, helmet.meta, helmet.link, helmet.script]
        .filter(Boolean)
        .map((part) => part.toString())
        .join("\n    ")
    : "";

  return { html, head };
}