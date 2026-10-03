import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { TreatmentsGrid } from "../components/sections/TreatmentsGrid";
import { FAQSection } from "../components/sections/FAQSection";
import { Seo } from "../components/seo/Seo";
import { breadcrumbSchema } from "../lib/schema";

export function TreatmentsIndex() {
  return (
    <SiteLayout>
      <Seo path="/treatments" schema={breadcrumbSchema("/treatments")} />

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