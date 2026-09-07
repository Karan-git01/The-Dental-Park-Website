import veneersBefore from "../assets/images/gallery/veneers-before.jpg";
import veneersAfter from "../assets/images/gallery/veneers-after.jpg";
import implantsBefore from "../assets/images/gallery/implants-before.jpg";
import implantsAfter from "../assets/images/gallery/implants-after.jpg";
import alignersBefore from "../assets/images/gallery/aligners-before.jpg";
import alignersAfter from "../assets/images/gallery/aligners-after.jpg";
import whiteningBefore from "../assets/images/gallery/whitening-before.jpg";
import whiteningAfter from "../assets/images/gallery/whitening-after.jpg";
import bracesBefore from "../assets/images/gallery/braces-before.jpg";
import bracesAfter from "../assets/images/gallery/braces-after.jpg";
import fullMouthBefore from "../assets/images/gallery/fullmouth-before.jpg";
import fullMouthAfter from "../assets/images/gallery/fullmouth-after.jpg";

export const galleryCategories = [
  "All Cases",
  "Cosmetic",
  "Implants",
  "Orthodontics",
  "Restorative",
];

export const smileCases = [
  {
    id: "veneers",
    title: "Porcelain Veneer Smile Design",
    category: "Cosmetic",
    treatment: "8 porcelain veneers",
    duration: "3 visits • 10 days",
    summary:
      "Deep staining and uneven edges corrected with hand-layered porcelain veneers designed on a digital smile mock-up.",
    before: veneersBefore,
    after: veneersAfter,
    slug: "porcelain-veneers",
  },
  {
    id: "implants",
    title: "Single Tooth Implant",
    category: "Implants",
    treatment: "Implant + zirconia crown",
    duration: "2 visits • 12 weeks",
    summary:
      "A missing front tooth replaced with a guided implant and a shade-matched crown that blends with the natural smile.",
    before: implantsBefore,
    after: implantsAfter,
    slug: "dental-implants",
  },
  {
    id: "aligners",
    title: "Clear Aligner Correction",
    category: "Orthodontics",
    treatment: "Invisible aligners",
    duration: "9 months",
    summary:
      "Crowding and rotation resolved without visible braces using a fully digital aligner treatment plan.",
    before: alignersBefore,
    after: alignersAfter,
    slug: "aligners",
  },
  {
    id: "whitening",
    title: "In-Clinic Teeth Whitening",
    category: "Cosmetic",
    treatment: "Laser whitening",
    duration: "Single 60 min visit",
    summary:
      "Years of tea and coffee staining lifted by several shades in one gentle, enamel-safe whitening session.",
    before: whiteningBefore,
    after: whiteningAfter,
    slug: "whitening",
  },
  {
    id: "braces",
    title: "Fixed Braces Treatment",
    category: "Orthodontics",
    treatment: "Ceramic braces",
    duration: "16 months",
    summary:
      "A complex bite and spacing case aligned with fixed braces followed by a fixed retainer for lasting stability.",
    before: bracesBefore,
    after: bracesAfter,
    slug: "braces",
  },
  {
    id: "full-mouth",
    title: "Full Mouth Rehabilitation",
    category: "Restorative",
    treatment: "Crowns + bite reconstruction",
    duration: "5 visits • 8 weeks",
    summary:
      "Worn and decayed teeth rebuilt with ceramic crowns, restoring both function and a confident appearance.",
    before: fullMouthBefore,
    after: fullMouthAfter,
    slug: "full-mouth-rehabilitation",
  },
];