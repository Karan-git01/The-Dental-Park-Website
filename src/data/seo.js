import { clinic } from "./clinics.js";
import { treatments } from "./treatments.js";

/* -------------------------------------------------------------------------
 * Site-wide constants
 * Set VITE_SITE_URL in .env (e.g. a staging URL) to override the domain.
 * `import.meta.env?.` is optional-chained so this file also works when it is
 * imported from plain Node scripts (sitemap generator, prerender).
 * ---------------------------------------------------------------------- */
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL || "https://www.thedentalpark.in"
).replace(/\/+$/, "");

export const SITE_NAME = "THE DENTAL PARK";
export const SITE_LOCALE = "en_IN";

// Set VITE_ALLOW_INDEXING="true" in Vercel only once the real domain is live.
// Until then every page is served with noindex, so the vercel.app copy stays out of Google.
export const ALLOW_INDEXING = import.meta.env?.VITE_ALLOW_INDEXING === "true";

export const DEFAULT_DESCRIPTION =
  "THE DENTAL PARK is Dr. Pratik Singh's dental clinic in Kalighat, Kolkata, offering comprehensive dental care and treatments.";

// 1200x630 image in /public. Create it before launch.
export const DEFAULT_IMAGE = "/og-default.jpg";

/* ------------------------------------------------------------------------- */

export const normalizePath = (input = "/") => {
  let path = String(input).split(/[?#]/)[0].trim();
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
};

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  const p = normalizePath(path);
  return p === "/" ? SITE_URL : `${SITE_URL}${p}`;
};

/* -------------------------------------------------------------------------
 * Static routes. Titles are COMPLETE (brand included): do not append the
 * site name again in <Seo />. Keep titles <= ~60 chars, descriptions <= ~160.
 * ---------------------------------------------------------------------- */
const routeSeo = {
  "/": {
    title: `Dentist in Kalighat, Kolkata | ${SITE_NAME}`,
    description:
      "THE DENTAL PARK by Dr. Pratik Singh in Kalighat, Kolkata. Smile design, dental implants, root canal, aligners and more. Open Mon to Sat. Book today.",
  },
  "/treatments": {
    title: `Dental Treatments in Kolkata | ${SITE_NAME}`,
    description: `Explore ${treatments.length} dental treatments at THE DENTAL PARK, Kalighat: smile design, implants, root canal, aligners, braces, whitening, laser dentistry and more.`,
  },
  "/about": {
    title: `About Us | Dental Clinic in Kalighat, Kolkata | ${SITE_NAME}`,
    description:
      "Meet THE DENTAL PARK, a Kalighat dental clinic led by Dr. Pratik Singh, combining advanced digital technology, a sterilised environment and transparent pricing.",
  },
  "/doctors": {
    title: `Dr. Pratik Singh | Dentist in Kolkata | ${SITE_NAME}`,
    description:
      "Meet Dr. Pratik Singh, founder and Lead Dental Surgeon at THE DENTAL PARK, Kalighat, Kolkata. Smile makeovers, crowns, root canals and facial aesthetics.",
  },
  "/gallery": {
    title: `Smile Gallery | ${SITE_NAME}, Kolkata`,
    description:
      "Browse smile transformations from patients of THE DENTAL PARK, a dental clinic in Kalighat, Kolkata.",
  },
  "/clinics": {
    title: `Dental Clinic in Kalighat, Kolkata | ${SITE_NAME}`,
    description:
      "Visit THE DENTAL PARK at 113/1A Hazra Rd, Kalighat, Kolkata 700026. Open Mon to Fri 10 AM to 9 PM and Sat 10 AM to 5:30 PM. Closed Sundays.",
  },
  "/technology": {
    title: `Advanced Dental Technology | ${SITE_NAME}, Kolkata`,
    description:
      "Intraoral 3D scanners, CBCT imaging, dental lasers, CAD/CAM milling and digital smile design at THE DENTAL PARK, Kalighat, Kolkata.",
  },
  "/testimonials": {
    title: `Patient Reviews & Testimonials | ${SITE_NAME}`,
    description: `Read what patients say about THE DENTAL PARK in Kalighat, Kolkata, rated ${clinic.googleRating} on Google from ${clinic.googleReviewCount} reviews.`,
  },
  "/faq": {
    title: `Dental FAQs | ${SITE_NAME}, Kolkata`,
    description:
      "Answers on treatments, booking, consultation costs, clinic timings and emergency dental care at THE DENTAL PARK, Kalighat, Kolkata.",
  },
  "/contact": {
    title: `Book an Appointment | Contact ${SITE_NAME}, Kolkata`,
    description: `Book a visit or call ${clinic.phone}. THE DENTAL PARK, Hazra Rd, Kalighat, Kolkata. Open Mon to Fri 10 AM to 9 PM, Sat 10 AM to 5:30 PM.`,
  },
  "/terms": {
    title: `Terms of Use | ${SITE_NAME}`,
    description:
      "The terms that apply when you use the THE DENTAL PARK website in Kolkata, request an appointment or contact our team.",
  },
  "/privacy-policy": {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "How THE DENTAL PARK in Kolkata collects, uses and protects your personal information when you visit our website or book an appointment.",
  },
};

/* -------------------------------------------------------------------------
 * Treatment pages: one hand-written description each (the long `summary`
 * text in treatments.js is too long for a meta description).
 * Titles are built as "<name> in Kolkata | THE DENTAL PARK".
 * ---------------------------------------------------------------------- */
const treatmentSeo = {
  "smile-design": {
    name: "Smile Design",
    description:
      "Preview your new smile before treatment with Digital Smile Design at THE DENTAL PARK, Kalighat, Kolkata. Minimally invasive, face-matched results.",
  },
  "porcelain-veneers": {
    name: "Porcelain Veneers",
    description:
      "Ultra-thin, hand-crafted porcelain veneers to correct colour, shape, chips and small gaps. Visit THE DENTAL PARK in Kalighat, Kolkata.",
  },
  "dental-implants": {
    name: "Dental Implants",
    description:
      "Dental implants from a single tooth to a full arch. Natural-looking, durable tooth replacement at THE DENTAL PARK, Kalighat, Kolkata.",
  },
  aligners: {
    name: "Invisible Aligners",
    description:
      "Clear, removable Invisalign aligners to straighten teeth discreetly, with a 3D scan and treatment preview at THE DENTAL PARK, Kalighat, Kolkata.",
  },
  "root-canal": {
    name: "Painless Root Canal",
    description:
      "Painless, often single-visit root canal treatment using rotary endodontics and magnification at THE DENTAL PARK, Kalighat, Kolkata.",
  },
  whitening: {
    name: "Teeth Whitening",
    description:
      "Professional teeth whitening with in-chair results in about an hour plus take-home kits, at THE DENTAL PARK, Kalighat, Kolkata.",
  },
  braces: {
    name: "Braces & Orthodontics",
    description:
      "Metal, ceramic and self-ligating braces for adults and adolescents at THE DENTAL PARK, Kalighat, Kolkata. Predictable, lasting results.",
  },
  "full-mouth-rehabilitation": {
    name: "Full Mouth Rehabilitation",
    description:
      "Implants, crowns and bite correction planned together to restore function and aesthetics. THE DENTAL PARK, Kalighat, Kolkata.",
  },
  "crowns-bridges": {
    name: "Crowns & Bridges",
    description:
      "Precision-milled zirconia and E-max crowns and bridges for broken, root-treated or missing teeth. THE DENTAL PARK, Kalighat, Kolkata.",
  },
  "laser-dentistry": {
    name: "Laser Dentistry",
    description:
      "Laser treatment for gum reshaping, depigmentation, frenectomy and gum disease, with less bleeding and faster healing. THE DENTAL PARK, Kolkata.",
  },
  "kids-dentistry": {
    name: "Paediatric Dentistry",
    description:
      "Gentle, child-friendly dentistry: preventive care, fluoride, sealants and fillings at THE DENTAL PARK, Kalighat, Kolkata.",
  },
  "maxillofacial-surgery": {
    name: "Maxillofacial Surgery",
    description:
      "Wisdom tooth removal, bone grafting, cyst removal and jaw correction surgery at THE DENTAL PARK, Kalighat, Kolkata.",
  },
};

const treatmentRoute = (path) => {
  const match = path.match(/^\/treatments\/([^/]+)$/);
  if (!match) return null;
  const treatment = treatments.find((t) => t.slug === match[1]);
  if (!treatment) return null;

  const custom = treatmentSeo[treatment.slug];
  const name = custom?.name ?? treatment.title;
  return {
    title: `${name} in Kolkata | ${SITE_NAME}`,
    description: custom?.description ?? treatment.summary.slice(0, 157).trimEnd() + "...",
  };
};

const notFoundSeo = {
  title: `Page not found | ${SITE_NAME}`,
  description: "The page you are looking for could not be found.",
};

/* -------------------------------------------------------------------------
 * Public API
 * ---------------------------------------------------------------------- */

/**
 * Returns { registered, title, description, path, url, image } for a pathname.
 * `registered` is false for paths not in this file (e.g. a 404 page).
 */
export function getSeo(pathname = "/") {
  const path = normalizePath(pathname);
  const found = routeSeo[path] ?? treatmentRoute(path);
  return {
    registered: Boolean(found),
    ...(found ?? notFoundSeo),
    path,
    url: absoluteUrl(path),
    image: absoluteUrl(DEFAULT_IMAGE),
  };
}

/** Every indexable path (used by the sitemap + prerender in Batch 4). */
export const indexablePaths = () => [
  ...Object.keys(routeSeo),
  ...treatments.map((t) => `/treatments/${t.slug}`),
];