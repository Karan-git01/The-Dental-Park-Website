// scripts/crawler-files.js
// Called by scripts/prerender.js after the pages are rendered. Writes
// dist/sitemap.xml, dist/robots.txt and dist/llms.txt.
//
// The URL list comes from the same `routes` array that is prerendered, so the
// sitemap can never drift from the real pages. The domain and the indexing
// switch come from the same Vercel environment variables as <Seo />.
import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "vite";

// Keep these two in sync with src/components/seo/Seo.jsx.
const PRODUCTION_URL = "https://www.thedentalpark.in";
// Same sources as the Vite build: .env files (e.g. .env.local) and real
// environment variables (Vercel dashboard, PowerShell $env:). Real ones win.
const env = { ...loadEnv("production", process.cwd(), "VITE_"), ...process.env };
const siteUrl = (env.VITE_SITE_URL || PRODUCTION_URL).trim().replace(/\/+$/, "");
const allowIndexing = env.VITE_ALLOW_INDEXING === "true";

// AI crawlers we explicitly welcome once the site is live.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

const urlFor = (route) => (route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`);

function buildSitemap(routes) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = routes
    .map((route) => `  <url>\n    <loc>${urlFor(route)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function buildRobots() {
  if (!allowIndexing) {
    // Staging / vercel.app address: keep every crawler out.
    return "# Site not live yet: indexing is switched off.\nUser-agent: *\nDisallow: /\n";
  }
  const ai = aiCrawlers.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n");
  return `User-agent: *\nAllow: /\n\n${ai}\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

// Only facts the clinic has confirmed. No prices, ratings or years of practice.
function buildLlmsTxt(routes) {
  const has = (route) => routes.includes(route);
  const page = (route, label, note) => (has(route) ? `- [${label}](${urlFor(route)}): ${note}\n` : "");

  return `# The Dental Park

> The Dental Park is a dental and facial aesthetics clinic on Hazra Road, Kalighat, Kolkata, founded and led by Dr. Pratik Singh (BDS, certified Medical Facial Cosmetologist).

## Clinic details

- Address: Ground Floor, 113/1A, Hazra Road, near Hotel Sidharth Building, Kalighat, Kolkata, West Bengal 700026
- Phone: +91 98329 32796, +91 91314 67829
- Email: thedentalparksocials@gmail.com
- Hours: Monday to Friday 10:00 AM to 9:00 PM, Saturday 10:00 AM to 5:30 PM, Sunday closed
- Website: ${siteUrl}/

## Doctor

- Dr. Pratik Singh, founder and Lead Dental Surgeon. Qualifications: Bachelor of Dental Surgery (BDS); certified Medical Facial Cosmetologist.

## Treatments offered

- Cosmetic dentistry: smile designing, teeth whitening, veneers, digital smile design, cosmetic bonding
- General dentistry: dental check-ups, fillings, root canal treatment (painless, single sitting), scaling and polishing, gum treatment
- Orthodontics: metal braces, ceramic braces, clear aligners, retainers, jaw correction
- Children's dentistry: check-ups, fluoride treatment, sealants, paediatric fillings, habit breaking
- Restorative dentistry: dental implants, zirconia / ceramic / metal-ceramic crowns, fixed bridges, dentures, full mouth rehabilitation, tooth extraction including impacted wisdom teeth

## Key pages

${page("/treatments", "All treatments", "Overview of every treatment offered")}${page("/doctors", "Our doctor", "Dr. Pratik Singh's qualifications and areas of expertise")}${page("/clinics", "Clinic and directions", "Address, map and consultation hours")}${page("/faq", "FAQs", "Answers to common dental questions")}${page("/technology", "Technology", "Equipment and digital workflow used at the clinic")}${page("/gallery", "Smile gallery", "Before and after results")}${page("/testimonials", "Testimonials", "Patient reviews")}${page("/contact", "Contact and appointments", "Book an appointment")}${page("/about", "About", "About The Dental Park")}`;
}

export function writeCrawlerFiles({ dist, routes }) {
  fs.writeFileSync(path.join(dist, "sitemap.xml"), buildSitemap(routes));
  fs.writeFileSync(path.join(dist, "robots.txt"), buildRobots());
  fs.writeFileSync(path.join(dist, "llms.txt"), buildLlmsTxt(routes));

  console.log(
    `\ncrawler files written (site: ${siteUrl}, indexing ${allowIndexing ? "ON" : "OFF"}, ${routes.length} urls in sitemap)`,
  );
}