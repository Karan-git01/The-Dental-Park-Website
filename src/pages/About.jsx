import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { WhyTrust } from "../components/sections/WhyTrust";
import { Testimonials } from "../components/sections/Testimonials";
import { Seo } from "../components/seo/Seo";
import { breadcrumbSchema } from "../lib/schema";

export function About() {
  return (
    <SiteLayout>
      <Seo path="/about" schema={breadcrumbSchema("/about")} />

      <PageHeader
        eyebrow="About Us"
        title="Dentistry Built Around Comfort and Trust"
        description="For over two decades The Dental Park has combined specialist expertise with modern technology to make world-class dental care simple, painless and transparent for every family we treat."
        crumbs={[{ label: "About" }]}
      />
      <WhyTrust />
      <Testimonials />
    </SiteLayout>
  );
}