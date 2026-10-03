// src/components/seo/Seo.jsx
import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  ALLOW_INDEXING,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  absoluteUrl,
  getSeo,
} from "../../data/seo.js";
import { serializeJsonLd } from "./JsonLd.jsx";

// Re-exported so any existing `import { SITE_URL } from ".../Seo"` keeps working.
export {
  SITE_URL,
  SITE_NAME,
  ALLOW_INDEXING,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
};

/**
 * Env vars (Vercel dashboard -> Settings -> Environment Variables):
 *   VITE_SITE_URL        = address the site is served from (no trailing slash)
 *   VITE_ALLOW_INDEXING  = "true" only once the real domain is live
 *
 * Usage:
 *   <Seo path="/about" />
 *       -> title + description come from src/data/seo.js (title is complete)
 *   <Seo path="/treatments/root-canal" schema={[procedureSchema("root-canal"), breadcrumbSchema("/treatments/root-canal")]} />
 *   <Seo title="Custom" description="..." path="/x" />
 *       -> explicit title gets " | THE DENTAL PARK" appended (legacy behaviour)
 *   <Seo path="/404" title="Page not found" noindex />
 *
 * Put structured data in the `schema` prop. Do NOT nest <JsonLd /> as a child:
 * it renders its own <Helmet>, which is not valid inside another <Helmet>.
 */
export function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  schema,
  children,
}) {
  const entry = getSeo(path);

  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : entry.registered
      ? entry.title
      : `${SITE_NAME} | Dentist in Kalighat, Kolkata`;
  const desc =
    description || (entry.registered ? entry.description : DEFAULT_DESCRIPTION);
  const url = entry.url; // one canonical form: no trailing slash, root = bare domain
  const img = absoluteUrl(image);
  const jsonLd = serializeJsonLd(schema);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={
          noindex || !ALLOW_INDEXING
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
        }
      />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta
        property="og:image:alt"
        content={`${SITE_NAME}, dental clinic in Kalighat, Kolkata`}
      />
      {image === DEFAULT_IMAGE && (
        <meta property="og:image:width" content="1200" />
      )}
      {image === DEFAULT_IMAGE && (
        <meta property="og:image:height" content="630" />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {jsonLd && <script type="application/ld+json">{jsonLd}</script>}

      {children}
    </Helmet>
  );
}

export default Seo;
