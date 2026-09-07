import { Helmet } from "react-helmet-async";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { WhyTrust } from "../components/sections/WhyTrust";
import { Testimonials } from "../components/sections/Testimonials";

export function About() {
  return (
    <SiteLayout>
      <Helmet>
        <title>About The Dental Park | Smile Better. Live Better.</title>
        <meta
          name="description"
          content="Learn about The Dental Park — specialist-led dental clinics across India delivering painless, transparent and technology-driven care."
        />
        <meta property="og:title" content="About The Dental Park" />
        <meta
          property="og:description"
          content="Specialist-led dental clinics delivering painless, transparent, technology-driven care across India."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/about" />
      </Helmet>

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