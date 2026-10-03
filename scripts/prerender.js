// scripts/prerender.js
// Runs after `vite build` (client) and `vite build --ssr` (server).
// Renders every route to static HTML and writes dist/<route>/index.html.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = path.join(root, "dist-server", "entry-server.js");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
const { render, routes } = await import(pathToFileURL(serverEntry).href);

let failed = 0;

for (const url of routes) {
  try {
    const { html: rendered, head: helmetHead } = render(url);

    if (rendered.trim().length === 0) {
      throw new Error("rendered EMPTY HTML (the app returned nothing on the server)");
    }

    // React 19 renders <title>, <meta> and <link> inline at the very start of
    // the output instead of in <head>. Everything before the first real
    // element (the page's first <div>) is such "hoisted" head content, so move
    // it into <head>. Search engines expect these tags in <head>, not <body>.
    const firstBodyElement = rendered.search(/<(?!(?:title|meta|link|script|style|base)\b)[a-z]/i);
    const hoisted = firstBodyElement === -1 ? "" : rendered.slice(0, firstBodyElement);
    const html = firstBodyElement === -1 ? rendered : rendered.slice(firstBodyElement);

    // Helmet's own head output (if this react-helmet-async version provides
    // it) is only used when React did not already hoist a <title>.
    const head = hoisted.includes("<title") ? hoisted : `${hoisted}${helmetHead}`;

    const page = template
      // Drop the fallback <title>; the page's own <Seo /> title is in `head`.
      .replace(/<title>[\s\S]*?<\/title>/, "")
      .replace("</head>", () => `    ${head}\n  </head>`)
      .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);

    const outDir = url === "/" ? dist : path.join(dist, url);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), page);
    console.log(`prerendered ${url} (${(html.length / 1024).toFixed(1)} kB html)`);
  } catch (error) {
    failed += 1;
    console.error(`FAILED ${url}:`, error);
  }
}

// The server bundle is only needed for this step.
fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });

if (failed > 0) {
  console.error(`\n${failed} route(s) failed to prerender.`);
  process.exit(1);
}
console.log(`\nDone: ${routes.length} routes prerendered.`);