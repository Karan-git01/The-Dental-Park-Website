import {
  Baby,
  BriefcaseMedical,
  CalendarCheck,
  ScanSearch,
  Siren,
  Sparkles,
  Stethoscope,
  Zap,
} from "lucide-react";

export const helpOptions = [
  { id: "checkup", icon: ScanSearch, title: "Regular Check-up", description: "Routine dental check-up & consultation" },
  { id: "implants", icon: Stethoscope, title: "Dental Implants", description: "Permanent solution for missing teeth" },
  { id: "kids", icon: Baby, title: "Kids Dentistry", description: "Gentle care for your little ones" },
  { id: "braces", icon: BriefcaseMedical, title: "Braces & Aligners", description: "Straighten your smile with ease" },
  { id: "follow", icon: CalendarCheck, title: "Follow Appointment", description: "Continue your ongoing treatment" },
  { id: "pain", icon: Zap, title: "Tooth Pain", description: "Get relief from dental pain" },
  { id: "cleaning", icon: Sparkles, title: "Tooth Cleaning", description: "Professional cleaning for a healthier smile" },
  { id: "emergency", icon: Siren, title: "Emergency Care", description: "Immediate care for dental emergencies" },
];