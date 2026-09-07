import { Helmet } from "react-helmet-async";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { FAQSection } from "../components/sections/FAQSection";

export function Faq() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Dental FAQs | Appointments, Costs & Treatments</title>
        <meta
          name="description"
          content="Answers to common questions about appointments, clinic timings, treatment costs, EMI options and emergency dental care at The Dental Park."
        />
        <meta property="og:title" content="Dental FAQs | The Dental Park" />
        <meta
          property="og:description"
          content="Appointments, timings, pricing, EMI and emergency care — answered."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/faq" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/faq" />
      </Helmet>

      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about our services, appointments and treatments."
        crumbs={[{ label: "FAQs" }]}
      />
      <FAQSection />
    </SiteLayout>
  );
}