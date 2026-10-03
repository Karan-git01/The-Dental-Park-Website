import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { FAQSection } from "../components/sections/FAQSection";
import { Seo } from "../components/seo/Seo";
import { faqSchema, breadcrumbSchema } from "../lib/schema";
import { faqs } from "../data/faqs";

export function Faq() {
  return (
    <SiteLayout>
      <Seo path="/faq" schema={[faqSchema(faqs), breadcrumbSchema("/faq")]} />

      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about our services, appointments and treatments."
        crumbs={[{ label: "FAQs" }]}
      />
      <FAQSection showHeading={false} />
    </SiteLayout>
  );
}