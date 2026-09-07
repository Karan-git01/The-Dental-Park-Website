import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { TreatmentsGrid } from "../components/sections/TreatmentsGrid";
import { FAQSection } from "../components/sections/FAQSection";

export function TreatmentsIndex() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Treatments"
        title="Advanced Dental Care for Every Smile"
        description="From preventive dentistry to complete smile transformations, explore our comprehensive range of treatments performed by experienced specialists using modern technology."
        crumbs={[{ label: "Treatments" }]}
      />
      <TreatmentsGrid compact />
      <FAQSection />
    </SiteLayout>
  );
}

// SEO metadata for this route — head data previously supplied via
// TanStack Start's `head()` option. Not yet wired up (see Phase 9 /
// Section 26 — SEO mechanism for React Router not yet decided).
// Preserved here, unused, so nothing approved is lost.
export const treatmentsIndexMeta = {
  title: "Dental Treatments in India | The Dental Park",
  description:
    "Explore implants, aligners, veneers, root canals and more — 12 specialist dental treatments delivered with advanced technology at The Dental Park.",
  ogTitle: "Dental Treatments | The Dental Park",
  ogDescription:
    "Advanced dental care for every smile — implants, orthodontics, cosmetic and paediatric dentistry.",
  ogType: "website",
  ogUrl: "/treatments",
  twitterCard: "summary_large_image",
  canonical: "/treatments",
};