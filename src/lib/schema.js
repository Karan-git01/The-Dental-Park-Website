import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
  absoluteUrl,
  normalizePath,
} from "../data/seo.js";
import { clinic } from "../data/clinics.js";
import { treatments, treatmentBySlug } from "../data/treatments.js";
import { navItems } from "../data/navigation.js";

/* =========================================================================
 * FILL THESE IN. Anything left empty/undefined is simply left out of the
 * JSON-LD, so nothing is ever invented. The more you fill, the better the
 * local-search signals.
 * ====================================================================== */
export const BUSINESS_EXTRAS = {
  email: undefined, // e.g. "hello@thedentalpark.in" (only if shown on the site)
  image: DEFAULT_IMAGE, // swap for a real clinic photo (path or absolute URL)
  logo: undefined, // e.g. "/logo.png"
  geo: undefined, // { latitude: 22.xxxx, longitude: 88.xxxx } from Google Maps
  priceRange: undefined, // e.g. "₹₹"
  // Google Business Profile URL, Instagram, Facebook, Practo, etc.
  sameAs: [],
};

// Defaults only: Doctors.jsx passes image, description, credentials and
// knowsAbout straight from its own `doctor` object so nothing is duplicated.
export const DOCTOR_EXTRAS = {
  image: undefined, // doctor portrait, path or absolute URL
  description: undefined, // short bio, must match what the Doctors page says
  credentials: [], // e.g. ["BDS"], only what the site states
  knowsAbout: [], // areas of expertise shown on the site
  sameAs: [], // LinkedIn, Practo, etc.
};

// Google does not allow self-serving review ratings on a business's own site
// to earn review stars, and a mismatch with live Google data can look spammy.
// Leave false unless you display the reviews on-page and accept that trade-off.
export const INCLUDE_AGGREGATE_RATING = false;

export const DOCTOR_NAME = "Dr. Pratik Singh";

/* ------------------------------------------------------------------------- */

export const ids = {
  dentist: `${SITE_URL}/#dentist`,
  doctor: `${SITE_URL}/doctors#dr-pratik-singh`,
};

/* ---------- helpers ---------- */

const isEmpty = (v) =>
  v === undefined ||
  v === null ||
  v === "" ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0);

/** Recursively drops undefined / null / empty strings, arrays and objects. */
const clean = (value) => {
  if (Array.isArray(value)) return value.map(clean).filter((v) => !isEmpty(v));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const c = clean(v);
      if (!isEmpty(c)) out[k] = c;
    }
    return out;
  }
  return value;
};

// "10:00 AM" -> "10:00", "9:00 PM" -> "21:00"
const to24 = (t) => {
  const m = String(t).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
};

// Groups days with identical hours; skips "Closed" days.
const openingHoursSpec = (hours = []) => {
  const groups = new Map();
  for (const { day, time } of hours) {
    const [open, close] = String(time).split(/\s*[-–]\s*/).map(to24);
    if (!open || !close) continue;
    const key = `${open}-${close}`;
    if (!groups.has(key)) groups.set(key, { open, close, days: [] });
    groups.get(key).days.push(day);
  }
  return [...groups.values()].map(({ open, close, days }) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens: open,
    closes: close,
  }));
};

// "Ground Floor, ..., Kalighat, Kolkata, West Bengal 700026"
const parseAddress = (address = "") => {
  const m = address.match(/^(.*),\s*([^,]+),\s*([^,]+?)\s+(\d{6})$/);
  if (!m) return { streetAddress: address, addressCountry: "IN" };
  return {
    streetAddress: m[1],
    addressLocality: m[2],
    addressRegion: m[3],
    postalCode: m[4],
    addressCountry: "IN",
  };
};

const phoneE164 = () => clinic.phoneHref?.replace(/^tel:/, "") ?? undefined;

/* =========================================================================
 * Builders (each returns a plain node WITHOUT @context; <JsonLd /> adds it)
 * ====================================================================== */

/** The clinic itself. Use on Home, Clinics and Contact. */
export function dentistSchema() {
  return clean({
    "@type": "Dentist",
    "@id": ids.dentist,
    name: clinic.name,
    alternateName: SITE_NAME,
    url: absoluteUrl("/"),
    telephone: phoneE164(),
    email: BUSINESS_EXTRAS.email,
    image: BUSINESS_EXTRAS.image && absoluteUrl(BUSINESS_EXTRAS.image),
    logo: BUSINESS_EXTRAS.logo && absoluteUrl(BUSINESS_EXTRAS.logo),
    priceRange: BUSINESS_EXTRAS.priceRange,
    medicalSpecialty: "Dentistry",
    address: { "@type": "PostalAddress", ...parseAddress(clinic.address) },
    geo: BUSINESS_EXTRAS.geo && {
      "@type": "GeoCoordinates",
      ...BUSINESS_EXTRAS.geo,
    },
    hasMap: clinic.mapQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`
      : undefined,
    openingHoursSpecification: openingHoursSpec(clinic.hours),
    areaServed: clinic.city,
    availableService: treatments.map((t) => ({
      "@type": "MedicalProcedure",
      name: t.title,
      url: absoluteUrl(`/treatments/${t.slug}`),
    })),
    aggregateRating:
      INCLUDE_AGGREGATE_RATING && clinic.googleRating
        ? {
            "@type": "AggregateRating",
            ratingValue: clinic.googleRating,
            reviewCount: clinic.googleReviewCount,
            bestRating: 5,
          }
        : undefined,
    sameAs: BUSINESS_EXTRAS.sameAs,
  });
}

/** The dentist as a person. Use on /doctors (and About if he is featured). */
export function physicianSchema(overrides = {}) {
  const x = { ...DOCTOR_EXTRAS, ...overrides };
  return clean({
    "@type": "Physician",
    "@id": ids.doctor,
    name: DOCTOR_NAME,
    url: absoluteUrl("/doctors"),
    medicalSpecialty: "Dentistry",
    image: x.image && absoluteUrl(x.image),
    description: x.description,
    hasCredential: (x.credentials || []).map((name) => ({
      "@type": "EducationalOccupationalCredential",
      name,
    })),
    knowsAbout: x.knowsAbout,
    sameAs: x.sameAs,
    parentOrganization: { "@id": ids.dentist },
  });
}

/**
 * FAQPage from [{ question, answer }]. Pass the SAME items the page renders.
 * Works for the global faqs and for treatment.faqs.
 */
export function faqSchema(items = []) {
  const entities = items
    .filter((f) => f?.question && f?.answer)
    .map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    }));
  if (!entities.length) return null;
  return { "@type": "FAQPage", mainEntity: entities };
}

/** MedicalProcedure for a treatment object or slug. */
export function procedureSchema(treatmentOrSlug) {
  const t =
    typeof treatmentOrSlug === "string"
      ? treatmentBySlug(treatmentOrSlug)
      : treatmentOrSlug;
  if (!t) return null;
  const url = absoluteUrl(`/treatments/${t.slug}`);
  return clean({
    "@type": "MedicalProcedure",
    "@id": `${url}#procedure`,
    name: t.title,
    description: t.summary,
    url,
    mainEntityOfPage: url,
    bodyLocation: "Mouth",
    howPerformed: (t.process || [])
      .map((s, i) => `${i + 1}. ${s.title}: ${s.description}`)
      .join(" "),
  });
}

/* ---------- breadcrumbs ---------- */

// Labels for routes that are not in navigation.js (footer-only pages).
const EXTRA_LABELS = {
  "/terms": "Terms of Use",
  "/privacy-policy": "Privacy Policy",
};

/** Builds [{ name, path }] from a pathname using nav labels + treatment titles. */
export function breadcrumbsFor(pathname = "/") {
  const path = normalizePath(pathname);
  const crumbs = [{ name: "Home", path: "/" }];
  if (path === "/") return crumbs;

  const match = path.match(/^\/treatments\/([^/]+)$/);
  if (match) {
    crumbs.push({ name: "Treatments", path: "/treatments" });
    const t = treatmentBySlug(match[1]);
    if (t) crumbs.push({ name: t.title, path });
    return crumbs;
  }

  const nav = navItems.find((n) => n.href === path);
  crumbs.push({ name: nav?.label ?? EXTRA_LABELS[path] ?? path.slice(1), path });
  return crumbs;
}

/** Accepts a pathname string OR an explicit [{ name, path }] array. */
export function breadcrumbSchema(input = "/") {
  const items = Array.isArray(input) ? input : breadcrumbsFor(input);
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}