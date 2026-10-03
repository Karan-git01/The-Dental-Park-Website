import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { Testimonials } from "../components/sections/Testimonials";
import { Seo } from "../components/seo/Seo";
import { breadcrumbSchema } from "../lib/schema";

export function TestimonialsPage() {
  return (
    <SiteLayout>
      <Seo path="/testimonials" schema={breadcrumbSchema("/testimonials")} />

      <PageHeader
        eyebrow="Testimonials"
        title="Loved by Our Patients, Proven by Their Smiles"
        description="Thousands of patients trust The Dental Park with their smiles every year. Here is what a few of them have to say."
        crumbs={[{ label: "Testimonials" }]}
      />
      <Testimonials showHeading={false} />
    </SiteLayout>
  );
}