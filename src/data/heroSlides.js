import heroWoman from "../assets/images/hero/slide-woman.jpg";
import heroMan from "../assets/images/hero/slide-man.jpg";
import heroChild from "../assets/images/hero/slide-child.jpg";
import heroSenior from "../assets/images/hero/slide-senior.jpg";
import heroFamily from "../assets/images/hero/slide-family.jpg";

const eyebrow = "For Healthier Smiles, Brighter Tomorrows";

export const heroSlides = [
  {
    id: "smile-makeover",
    mobileObjectClass: "object-[64%_14%]",
    desktopObjectClass: "md:object-[48%_18%]",
    eyebrow,
    titleTop: "Discover the Power of a",
    titleAccent: ["Perfect Smile", "Makeover"],
    description:
      "Advanced cosmetic dentistry to enhance your smile, boost your confidence and transform your life.",
    image: heroWoman,
    alt: "Smiling young woman seated in the dental chair after a cosmetic smile makeover",
  },
  {
    id: "dental-implants",
    mobileObjectClass: "object-[70%_14%]",
    desktopObjectClass: "md:object-[52%_18%]",
    eyebrow,
    titleTop: "Rediscover the Comfort of",
    titleAccent: ["Permanent Dental", "Implants"],
    description:
      "Replace missing teeth with precision implant solutions for a strong, natural and confident smile.",
    image: heroMan,
    alt: "Smiling man relaxed in the dental chair after implant treatment",
  },
  {
    id: "kids-dentistry",
    mobileObjectClass: "object-[68%_12%]",
    desktopObjectClass: "md:object-[50%_16%]",
    eyebrow,
    titleTop: "Gentle Care that Builds",
    titleAccent: ["Happy Kids", "Dentistry"],
    description:
      "Playful, painless visits designed to keep little teeth healthy and dental fear far away.",
    image: heroChild,
    alt: "Happy child patient smiling in the paediatric dental chair",
  },
  {
    id: "senior-care",
    mobileObjectClass: "object-[72%_12%]",
    desktopObjectClass: "md:object-[56%_16%]",
    eyebrow,
    titleTop: "Timeless Confidence with",
    titleAccent: ["Senior Dental", "Wellness"],
    description:
      "Comfort-first restorative dentistry that keeps every smile strong, healthy and beautifully natural.",
    image: heroSenior,
    alt: "Elegant senior patient smiling after restorative dental treatment",
  },
  {
    id: "family-dentistry",
    mobileObjectClass: "object-[66%_18%]",
    desktopObjectClass: "md:object-[48%_22%]",
    eyebrow,
    titleTop: "One Trusted Home for",
    titleAccent: ["Complete Family", "Dentistry"],
    description:
      "Every generation cared for under one roof with modern technology and a warm, personal touch.",
    image: heroFamily,
    alt: "Happy family smiling together at The Dental Park clinic",
  },
];