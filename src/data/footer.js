// src/data/footer.js
// Every link below points to a unique page. "Explore Dental Park" was removed
// because all of its links already appear in the other columns, the CTA or the
// address block.

export const footerColumns = [
  {
    title: "Our Advantage",
    links: [
      { label: "Clinics Near Me", to: "/clinics" },
      { label: "Patient Testimonials", to: "/testimonials" },
      { label: "Before & After Gallery", to: "/gallery" },
      { label: "Advanced Technology", to: "/technology" },
    ],
  },
  {
    title: "Dental Specialties",
    links: [
      { label: "Dental Implants", to: "/treatments/dental-implants" },
      { label: "Braces & Aligners", to: "/treatments/braces" },
      { label: "Root Canal Treatment", to: "/treatments/root-canal" },
      { label: "Cosmetic Dentistry", to: "/treatments/smile-design" },
      { label: "Paediatric Dentistry", to: "/treatments/kids-dentistry" },
      { label: "Laser Dentistry", to: "/treatments/laser-dentistry" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Doctors", to: "/doctors" },
      { label: "Treatments", to: "/treatments" },
      { label: "FAQs", to: "/faq" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];