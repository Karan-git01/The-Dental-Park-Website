/**
 * Tiny pub/sub bridge so the "How can we help you" selector can prefill the
 * appointment form and scroll the user to it. Presentation-only glue.
 */

const listeners = new Set();

/** Maps a help-selector option id to a treatment name used by the form select. */
export const helpToTreatment = {
  checkup: "General Dentistry",
  implants: "Dental Implants",
  kids: "Children's Dentistry",
  braces: "Orthodontics",
  follow: "General Dentistry",
  pain: "Root Canal Treatment",
  cleaning: "Preventive Dentistry",
  emergency: "Dental Surgery",
};

export function onAppointmentPrefill(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function prefillAppointment(treatment) {
  listeners.forEach((l) => l(treatment));
  if (typeof document === "undefined") return;
  requestAnimationFrame(() => {
    document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}