import { Star } from "lucide-react";

export const testimonials = [
  {
    id: "anannya",
    quote:
      "His gentle touch and clear explanations made my dental experience a breeze.",
    name: "Anannya Dutta",
    role: "Patient",
    city: "Kolkata",
  },
  {
    id: "harshit",
    quote:
      "Very kind and polite behaviour of doctor Pratik, very happy to meet him.",
    name: "Harshit Sharma",
    role: "Patient",
    city: "Kolkata",
  },
  {
    id: "santosh",
    quote:
      "The prices were reasonable, and I even got a discount.",
    name: "Santosh Sah",
    role: "Patient",
    city: "Kolkata",
  },
];

// NOT CONFIRMED — only the Google rating stat is backed by approved
// data (Section 5: "4.8 · 68 Google reviews"). Additional stat cards
// (years of experience, patients treated, treatments completed, etc.)
// are used by <Testimonials /> in a 3-up trust strip in the reference
// design, but no approved numbers or icons exist for them yet. Do not
// fabricate these — confirm the values/icons before filling them in.
export const trustStrip = [
  {
    icon: Star,
    value: "4.8",
    label: "Google Rating · 68 Reviews",
    star: true,
  },
];