import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { Testimonials } from "../components/sections/Testimonials";

export function TestimonialsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Testimonials"
        title="Loved by Our Patients, Proven by Their Smiles"
        description="Thousands of patients trust The Dental Park with their smiles every year. Here is what a few of them have to say."
        crumbs={[{ label: "Testimonials" }]}
      />
      <Testimonials />
    </SiteLayout>
  );
}

// SEO metadata for this route — head data previously supplied via
// TanStack Start's `head()` option. Not yet wired up: Phase 9
// (Routing + SEO, PRD Section 9/26) has not started, and no SEO
// mechanism (react-helmet-async, manual document.title, etc.) has
// been decided for the React Router setup yet. Keeping the source
// values here, unused, so nothing approved is lost until that
// decision is made.
export const testimonialsPageMeta = {
  title: "Patient Testimonials | The Dental Park Reviews",
  description:
    "Read what patients say about implants, aligners and smile makeovers at The Dental Park — rated 4.9 by thousands of happy smiles.",
  ogTitle: "Patient Testimonials | The Dental Park",
  ogDescription:
    "Loved by our patients, proven by their smiles — read real reviews.",
  ogType: "website",
  ogUrl: "/testimonials",
  twitterCard: "summary_large_image",
  canonical: "/testimonials",
};