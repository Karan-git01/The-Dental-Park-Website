// src/entry-server.jsx
// Used only at build time by scripts/prerender.js. Never loaded in the browser.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

/** Every URL that gets its own static HTML file. */
const staticRoutes = [
  "/",
  "/about",
  "/gallery",
  "/clinics",
  "/doctors",
  "/contact",
  "/faq",
  "/technology",
  "/testimonials",
  "/treatments",
  "/privacy-policy",
  "/terms",
];

// TODO (Batch 2): add the 12 treatment pages once data/treatments.js is shared:
//   import { treatments } from "./data/treatments";
//   const treatmentRoutes = treatments.map((t) => `/treatments/${t.slug}`);
const treatmentRoutes = [];

export const routes = [...staticRoutes, ...treatmentRoutes];

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