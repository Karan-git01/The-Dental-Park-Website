import { useParams } from "react-router-dom";
import { SiteLayout } from "../components/layout/SiteLayout";
import { TreatmentDetail } from "../components/sections/TreatmentDetail";
import { Seo } from "../components/seo/Seo";
import { procedureSchema, faqSchema, breadcrumbSchema } from "../lib/schema";
import { treatmentBySlug } from "../data/treatments";

export function TreatmentPage() {
  const { slug } = useParams();
  const treatment = treatmentBySlug(slug);
  const path = `/treatments/${slug}`;

  if (!treatment) {
    return (
      <SiteLayout>
        <Seo path={path} title="Treatment not found" noindex />
        <div className="mx-auto max-w-[720px] px-5 py-24 text-center">
          <h1 className="font-display text-[28px] font-bold text-ink">Treatment not found</h1>
          <p className="mt-3 text-body">The treatment you're looking for isn't available.</p>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Seo
        path={path}
        schema={[
          procedureSchema(treatment),
          faqSchema(treatment.faqs),
          breadcrumbSchema(path),
        ]}
      />
      <TreatmentDetail treatment={treatment} />
    </SiteLayout>
  );
}