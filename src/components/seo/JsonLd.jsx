import { Helmet } from "react-helmet-async";

const CONTEXT = "https://schema.org";

/**
 * Accepts one schema node or an array of nodes (nulls are ignored).
 * One node  -> { "@context", ...node }
 * Many nodes -> { "@context", "@graph": [...] }
 *
 * Usage:
 *   <JsonLd data={[dentistSchema(), breadcrumbSchema("/")]} />
 */
export const serializeJsonLd = (data) => {
  const nodes = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!nodes.length) return null;

  const payload =
    nodes.length === 1
      ? { "@context": CONTEXT, ...nodes[0] }
      : { "@context": CONTEXT, "@graph": nodes };

  // Escape "<" so content can never close the <script> tag early.
  return JSON.stringify(payload).replace(/</g, "\\u003c");
};

export default function JsonLd({ data }) {
  const json = serializeJsonLd(data);
  if (!json) return null;

  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  );
}