import { SiteLayout } from "../components/layout/SiteLayout";
import { Hero } from "../components/hero/Hero";
import { HelpSelector } from "../components/sections/HelpSelector";
import { TreatmentsGrid } from "../components/sections/TreatmentsGrid";
import { AppointmentForm } from "../components/sections/AppointmentForm";
import { WhyTrust } from "../components/sections/WhyTrust";
import { Testimonials } from "../components/sections/Testimonials";
import { FAQSection } from "../components/sections/FAQSection";
import { TrustBadgeMarquee } from "../components/shared/TrustBadgeMarquee";
import { Seo } from "../components/seo/Seo";
import { dentistSchema } from "../lib/schema";

export function Home() {
  return (
    <SiteLayout>
      <Seo path="/" schema={dentistSchema()} />
      <Hero />
      <HelpSelector />
      <TreatmentsGrid />
      <TrustBadgeMarquee />
      <AppointmentForm />
      <WhyTrust />
      <Testimonials />
      <FAQSection />
    </SiteLayout>
  );
}