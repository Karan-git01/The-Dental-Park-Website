import { Helmet } from "react-helmet-async";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { LegalContent } from "../components/sections/LegalContent";
import { contactInfo } from "../data/navigation";

const CLINIC_EMAIL = "thedentalparksocials@gmail.com";
const CLINIC_ADDRESS =
  "The Dental Park, Ground Floor, 113/1A, Hazra Rd, near Hotel Sidharth Building, Kalighat, Kolkata, West Bengal 700026";

const sections = [
  {
    id: "acceptance",
    title: "Accepting these terms",
    paragraphs: [
      `These Terms of Use apply to your use of the website of The Dental Park ("we", "us", "our"), a dental clinic at ${CLINIC_ADDRESS}. By using the website, contacting us through it or requesting an appointment, you agree to these terms. If you do not agree, please do not use the website.`,
    ],
  },
  {
    id: "website-information",
    title: "Information on this website",
    paragraphs: [
      "The content on this website is for general information only. It is not medical advice and does not replace a consultation with a qualified dentist. Only a personal examination can tell you which treatment is right for you.",
      "Photos and stories of previous patients, including before-and-after images, show individual cases. Results vary from person to person and depend on your oral health, the treatment chosen and how you follow aftercare.",
    ],
  },
  {
    id: "appointments",
    title: "Appointments",
    paragraphs: [
      "Sending an appointment request through the website, by phone or on WhatsApp is not a confirmed booking. Your appointment is confirmed only when our team confirms the date and time with you.",
      "If you cannot attend, please tell us as early as possible so that we can offer the slot to another patient. We may need to reschedule an appointment because of an emergency or the availability of a dentist, and we will contact you as soon as we can if that happens.",
    ],
  },
  {
    id: "fees",
    title: "Fees and payments",
    paragraphs: [
      "The cost of treatment depends on your individual needs and is explained after your consultation. Any price or range shown on the website or given before an examination is an estimate, not a fixed quote.",
      "If we offer EMI or finance options, they are provided subject to the terms of the lender or payment provider, who are responsible for their own terms and approvals.",
    ],
  },
  {
    id: "emergencies",
    title: "Emergencies",
    paragraphs: [
      "The website and the contact forms are not monitored around the clock and are not for medical emergencies. If you have severe pain, heavy bleeding, swelling of the face or neck, or trouble breathing or swallowing, call your local emergency number or go to the nearest hospital straight away.",
    ],
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    items: [
      "Give us accurate and complete information when you contact us or request an appointment.",
      "Use the website only for lawful purposes and in a way that does not harm it or other people.",
      "Do not try to gain unauthorised access to the website, copy its content in bulk with automated tools, or interfere with how it works.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Ownership of content",
    paragraphs: [
      "The text, images, logos, design and other material on this website belong to The Dental Park or are used with permission. You may view and print pages for your own personal use. You may not copy, republish or use our content for commercial purposes without our written permission.",
    ],
  },
  {
    id: "third-parties",
    title: "Links and third-party services",
    paragraphs: [
      "The website may link to or embed services from other companies, such as Google Maps and WhatsApp. We do not control these services and are not responsible for their content, availability or how they use your information. Your use of them is subject to their own terms.",
    ],
  },
  {
    id: "liability",
    title: "Limits on our responsibility",
    paragraphs: [
      "We try to keep the website accurate and available, but we cannot promise that it will always be error-free or uninterrupted. To the extent the law allows, we are not liable for any loss that results from using the website or relying on the information on it.",
      "Nothing in these terms limits any right you have under the law that cannot be limited, or our responsibility for the dental care we provide to you as a patient.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    paragraphs: [
      "How we handle your personal information is explained in our Privacy Policy. By using the website, you also agree to the way we use your information as described there.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India. Any dispute that arises from them will be subject to the courts in Kolkata, West Bengal.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. The date at the top of the page shows when they were last changed. If you keep using the website after a change, you accept the updated terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [
      `If you have any question about these terms, write to us at ${CLINIC_EMAIL}, call ${contactInfo.phone}, or visit us at ${CLINIC_ADDRESS}.`,
    ],
  },
];

export function Terms() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Terms of Use | The Dental Park</title>
        <meta
          name="description"
          content="The terms that apply when you use The Dental Park website in Kolkata, request an appointment or contact our team."
        />
        <meta property="og:title" content="Terms of Use | The Dental Park" />
        <meta
          property="og:description"
          content="The terms that apply when you use our website and request appointments."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/terms" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/terms" />
      </Helmet>

      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        description="The terms that apply when you use our website and request an appointment."
        crumbs={[{ label: "Terms of Use" }]}
      />

      <LegalContent
        updated="30 September 2026"
        intro="Please read these terms before you use our website. They explain what you can expect from us and what we ask of you."
        sections={sections}
      />
    </SiteLayout>
  );
}