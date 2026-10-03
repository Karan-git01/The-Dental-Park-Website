import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { LegalContent } from "../components/sections/LegalContent";
import { Seo } from "../components/seo/Seo";
import { breadcrumbSchema } from "../lib/schema";
import { contactInfo } from "../data/navigation";

const CLINIC_EMAIL = "thedentalparksocials@gmail.com";
const CLINIC_ADDRESS =
  "The Dental Park, Ground Floor, 113/1A, Hazra Rd, near Hotel Sidharth Building, Kalighat, Kolkata, West Bengal 700026";

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    paragraphs: [
      `This Privacy Policy explains how The Dental Park ("we", "us", "our") collects, uses and protects your personal information when you visit our website, contact us or book an appointment. We are a dental clinic located at ${CLINIC_ADDRESS}.`,
      `If you have any question about this policy, you can reach us at ${CLINIC_EMAIL} or ${contactInfo.phone}.`,
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    paragraphs: ["We collect only the information we need to help you. This may include:"],
    items: [
      "Contact details you give us, such as your name, phone number and email address.",
      "Appointment details, such as your preferred date and time, the treatment you are interested in, and any message you write to us.",
      "Health-related information that you choose to share while booking or contacting us, so that we can prepare for your visit. Your clinical records are created and kept separately when you are treated at the clinic.",
      "Messages you send us by phone, WhatsApp, email or through the website forms.",
      "Basic technical information about your visit, such as your browser, device type and the pages you view, collected through cookies or similar tools.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    items: [
      "To respond to your enquiries and to confirm, change or remind you about appointments.",
      "To provide dental care, follow up on your treatment and keep the records the law requires us to keep.",
      "To keep our website working, secure and easy to use.",
      "To send you information about our services, only where you have agreed to receive it. You can opt out at any time.",
      "To meet our legal and regulatory obligations.",
    ],
  },
  {
    id: "consent",
    title: "Consent and lawful use",
    paragraphs: [
      "We process your personal data with your consent, or where the law otherwise permits, including under the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000. When you submit a form or contact us, you agree to us using your information for the purposes described in this policy.",
      "You can withdraw your consent at any time by contacting us. Withdrawing consent will not affect anything we did before you withdrew it, and it may mean we can no longer provide some services to you.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    paragraphs: ["We do not sell your personal information. We share it only when it is needed, for example with:"],
    items: [
      "Service providers who help us run the website and communicate with you, such as hosting, email and messaging services.",
      "Dental laboratories and other healthcare professionals who are involved in your care, and only the information they need.",
      "Government authorities, courts or regulators, where we are required to do so by law.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    paragraphs: [
      "Our website may use cookies and similar technologies to remember your preferences and to understand how the site is used, so we can improve it. You can control or delete cookies in your browser settings. If you turn them off, some parts of the website may not work as expected.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    paragraphs: [
      "Our website may include links or embedded content from other services, such as Google Maps and WhatsApp. These services have their own privacy policies, and we are not responsible for how they handle your information. We encourage you to read them before you use those services.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep your information",
    paragraphs: [
      "We keep your information only for as long as we need it for the purposes above or as the law requires. Enquiry and booking details are kept for as long as they are useful for your care and our service. Clinical records are kept for the period required by applicable medical record rules.",
    ],
  },
  {
    id: "security",
    title: "How we protect it",
    paragraphs: [
      "We use reasonable technical and organisational safeguards to protect your information from loss, misuse and unauthorised access. No method of storing or sending information online is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: ["You have the right to:"],
    items: [
      "Ask what personal information we hold about you and get a summary of it.",
      "Ask us to correct information that is wrong or out of date.",
      "Ask us to delete information we no longer need, unless we must keep it by law.",
      "Withdraw your consent, or object to marketing messages.",
      "Nominate another person to exercise your rights on your behalf.",
    ],
  },
  {
    id: "children",
    title: "Children",
    paragraphs: [
      "If you are under 18, a parent or legal guardian should book appointments and give consent for your information to be used. We do not knowingly collect a child's personal data through the website without a parent or guardian's consent.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The date at the top of the page shows when it was last changed. If we make a significant change, we will make it clear on the website.",
    ],
  },
  {
    id: "contact",
    title: "Contact and complaints",
    paragraphs: [
      `To use any of your rights, or to raise a concern about how we handle your information, write to us at ${CLINIC_EMAIL}, call ${contactInfo.phone}, or visit us at ${CLINIC_ADDRESS}. We will reply as soon as we reasonably can.`,
    ],
  },
];

export function PrivacyPolicy() {
  return (
    <SiteLayout>
      <Seo path="/privacy-policy" schema={breadcrumbSchema("/privacy-policy")} />

      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect your personal information."
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <LegalContent
        updated="30 September 2026"
        intro="Your privacy matters to us. This page explains what information we collect, why we collect it and the choices you have, in plain language."
        sections={sections}
      />
    </SiteLayout>
  );
}