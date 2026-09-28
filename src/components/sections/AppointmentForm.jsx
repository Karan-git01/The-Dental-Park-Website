// src/components/sections/AppointmentForm.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { CalendarDays, Check, ChevronDown, Loader2, Phone, Smile, User } from "lucide-react";
import { z } from "zod";
import { treatmentLinks } from "../../data/navigation";
import { onAppointmentPrefill } from "../../lib/appointmentPrefill.js";
import { cn } from "../../lib/utils";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  treatment: z.string().trim().min(1, "Please select a treatment"),
  date: z.string().trim().min(1, "Please pick a date"),
  consent: z.literal(true, { message: "Please accept to be contacted" }),
});

const fieldClass =
  "h-16 w-full rounded-xl border bg-white pl-14 pr-4 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-muted-ink focus:ring-4";
const okClass = "border-line hover:border-brand/40 focus:border-brand focus:ring-brand/15";
const badClass = "border-destructive/70 focus:border-destructive focus:ring-destructive/15";

const panelVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AppointmentForm() {
  const [values, setValues] = useState({ name: "", phone: "", treatment: "", date: "" });
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const treatmentRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const dateRef = useRef(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(
    () =>
      onAppointmentPrefill((treatment) => {
        setValues((v) => ({ ...v, treatment }));
        setDone(false);
        setPrefilled(true);
        window.setTimeout(() => setPrefilled(false), 1600);
      }),
    [],
  );

  const set = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submit = (e) => {
    e.preventDefault();
    const parsed = schema.safeParse({ ...values, consent });
    if (!parsed.success) {
      const next = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setDone(false);
      const order = ["name", "phone", "treatment", "date"];
      const first = order.find((k) => next[k]);
      const refs = { name: nameRef, phone: phoneRef, treatment: treatmentRef, date: dateRef };
      if (first) refs[first]?.current?.focus();
      return;
    }
    setErrors({});
    setSubmitting(true);
    // TODO (Phase 6): replace this fake-submit timer with the real
    // Web3Forms POST once the shared src/lib/web3forms.js helper exists
    // (Section 4). Kept as-is for now — no logic changes outside this
    // conversion pass, per Section 22.
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 900);
  };

  const err = (key) => errors[key];

  const FieldError = ({ field }) =>
    err(field) ? (
      <p className="mt-1.5 pl-1 text-[13px] font-medium text-destructive" role="alert">
        {err(field)}
      </p>
    ) : null;

  const FieldLabel = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="mb-1.5 block pl-1 text-[12.5px] font-medium text-muted-ink">
      {children}
    </label>
  );

  return (
    <MotionConfig reducedMotion="user">
      <section id="appointment" className="bg-brand py-14 lg:py-20" aria-labelledby="appointment-heading">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <h2
            id="appointment-heading"
            className="font-display text-[22px] font-bold leading-tight text-white sm:text-[30px] lg:text-[36px]"
          >
            Book an Appointment at The Dental Park Near You
          </h2>
          <p className="mt-6 max-w-[620px] text-[14.5px] leading-[1.7] text-white/75">
            Takes under a minute. We&rsquo;ll call you back to confirm your slot — no payment needed to book.
          </p>

          <motion.div
            className="mt-10 rounded-[28px] border border-black/5 bg-white p-5 shadow-2xl shadow-black/20 sm:p-7 lg:p-9"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={panelVariants}
          >
            <form onSubmit={submit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <FieldLabel htmlFor="appt-name">Full Name</FieldLabel>
                  <div className="relative">
                    <User
                      className="pointer-events-none absolute left-4 top-1/2 h-7 w-7 -translate-y-1/2 text-brand"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <input
                      id="appt-name"
                      ref={nameRef}
                      className={cn(fieldClass, err("name") ? badClass : okClass)}
                      placeholder="Full Name"
                      aria-invalid={Boolean(err("name"))}
                      autoComplete="name"
                      maxLength={100}
                      value={values.name}
                      onChange={set("name")}
                    />
                  </div>
                  <FieldError field="name" />
                </div>

                <div>
                  <FieldLabel htmlFor="appt-phone">Phone Number</FieldLabel>
                  <div className="relative">
                    <Phone
                      className="pointer-events-none absolute left-4 top-1/2 h-7 w-7 -translate-y-1/2 text-brand"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <input
                      id="appt-phone"
                      ref={phoneRef}
                      className={cn(fieldClass, err("phone") ? badClass : okClass)}
                      placeholder="Phone Number"
                      aria-invalid={Boolean(err("phone"))}
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={20}
                      value={values.phone}
                      onChange={set("phone")}
                    />
                  </div>
                  <FieldError field="phone" />
                </div>

                <div>
                  <FieldLabel htmlFor="appt-treatment">Treatment Interested In</FieldLabel>
                  <div className="relative">
                    <Smile
                      className="pointer-events-none absolute left-4 top-1/2 h-7 w-7 -translate-y-1/2 text-brand"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 h-7 w-7 -translate-y-1/2 text-ink"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                    <select
                      id="appt-treatment"
                      ref={treatmentRef}
                      className={cn(
                        fieldClass,
                        err("treatment") ? badClass : okClass,
                        "appearance-none pr-11",
                        !values.treatment && "text-muted-ink",
                        prefilled && "border-gold ring-4 ring-gold/25",
                      )}
                      aria-invalid={Boolean(err("treatment"))}
                      value={values.treatment}
                      onChange={set("treatment")}
                    >
                      <option value="">Treatment Interested In</option>
                      {treatmentLinks.map((t) => (
                        <option key={t.href ?? t.label} value={t.label}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FieldError field="treatment" />
                </div>

                <div>
                  <FieldLabel htmlFor="appt-date">Preferred Date</FieldLabel>
                  <div className="relative">
                    <CalendarDays
                      className="pointer-events-none absolute left-4 top-1/2 h-7 w-7 -translate-y-1/2 text-brand"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <input
                      id="appt-date"
                      ref={dateRef}
                      type="date"
                      min={today}
                      className={cn(fieldClass, err("date") ? badClass : okClass, !values.date && "text-muted-ink")}
                      aria-invalid={Boolean(err("date"))}
                      value={values.date}
                      onChange={set("date")}
                    />
                  </div>
                  <FieldError field="date" />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-start gap-3 text-[14px] leading-snug text-muted-ink sm:items-center sm:text-[14.5px]">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setErrors((prev) => (prev.consent ? { ...prev, consent: undefined } : prev));
                    }}
                    className={cn(
                      "mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[6px] border bg-white bg-center bg-no-repeat transition-colors duration-200 checked:border-gold checked:bg-gold sm:mt-0",
                      err("consent") ? "border-destructive/70" : "border-line",
                    )}
                    style={{
                      backgroundImage: consent
                        ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23142019' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E\")"
                        : undefined,
                      backgroundSize: "14px 14px",
                    }}
                  />
                  I agree to receive appointment confirmations and updates via call, SMS, or WhatsApp.
                </label>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={submitting ? undefined : { y: -2 }}
                  whileTap={submitting ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex mt-2 mb-2 h-16 w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-gold px-10 text-[16px] font-semibold text-ink shadow-md shadow-gold/20 transition-shadow duration-200 hover:shadow-lg hover:shadow-gold/30 disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:min-w-[220px]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} aria-hidden />
                      Booking...
                    </>
                  ) : done ? (
                    <>
                      <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                      Booked
                    </>
                  ) : (
                    "Book Now"
                  )}
                </motion.button>
              </div>
              <FieldError field="consent" />

              <AnimatePresence>
                {done && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-5 flex items-center gap-2.5 rounded-xl border border-brand/25 bg-brand-light/60 px-4 py-3 text-[14.5px] font-medium text-brand"
                    role="status"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.1 }}
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    </motion.span>
                    Thanks! Our team will call you shortly to confirm your appointment.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}