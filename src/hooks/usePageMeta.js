import { useEffect } from "react";

// TODO: confirm the live domain once it's finalized, then update SITE_URL.
const DEFAULT_DESCRIPTION =
  "THE DENTAL PARK is Dr. Pratik Singh's dental clinic in Kalighat, Kolkata, offering comprehensive dental care and treatments.";
const SITE_URL = "https://www.thedentalpark.in";

export function usePageMeta(title, description, canonicalPath) {
  useEffect(() => {
    document.title = title ? `${title} | The Dental Park` : "The Dental Park";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    // Always set, even when no description is passed, so a page that calls
    // this hook without one (e.g. a loading state) doesn't leave the
    // previous route's description in place.
    meta.content = description || DEFAULT_DESCRIPTION;

    // Falls back to the current path when canonicalPath isn't passed, so
    // this tag (which persists across client-side route changes) is
    // always correct for whatever route is actually mounted.
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    const path = canonicalPath || window.location.pathname;
    link.href = `${SITE_URL}${path}`;
  }, [title, description, canonicalPath]);
}