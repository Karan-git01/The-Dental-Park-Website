// src/components/sections/AppointmentForm.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
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

// Borderless, underline-only control. The rule itself is drawn by <Field>.
const controlClass =
  "block h-12 w-full appearance-none rounded-none border-0 bg-transparent px-0 text-[17px] text-white caret-gold outline-none placeholder:text-white/35";

const EASE = [0.16, 1, 0.3, 1];

// Defined at module level so inputs keep focus between renders.
function Field({ label, htmlFor, error, active, children }) {
  return (
    <div className="group">
      <label htmlFor={htmlFor} className="block text-[13px] text-white/60">
        {label}
      </label>
      <div className="relative">
        {children}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-px transition-colors duration-300",
            error ? "bg-[#ffb4a8]" : "bg-white/25 group-hover:bg-white/45",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100",
            error ? "bg-[#ffb4a8]" : "bg-gold",
            active && "scale-x-100",
          )}
        />
      </div>
      <div className="min-h-[24px]">
        {error ? (
          <p className="pt-1.5 text-[13px] text-[#ffb4a8]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function AppointmentForm() {
  const [values, setValues] = useState({ name: "", phone: "", treatment: "", date: "" });
  const [consent, setConsent] = useState(false);
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

  return (
    <MotionConfig reducedMotion="user">
      <section id="appointment" className="bg-brand py-13 lg:py-28" aria-labelledby="appointment-heading">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2
              id="appointment-heading"
              className="max-w-[720px] font-display text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-white sm:text-[40px] lg:text-[46px]"
            >
              Book an Appointment at The Dental Park Near You
            </h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.7] text-white/70">
              Takes under a minute. We&rsquo;ll call you back to confirm your slot — no payment needed to book.
            </p>

            <form onSubmit={submit} noValidate className="mt-14 max-w-[820px]">
              <div className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="appt-name" error={err("name")}>
                  <input
                    id="appt-name"
                    ref={nameRef}
                    className={controlClass}
                    placeholder="Full Name"
                    aria-invalid={Boolean(err("name"))}
                    autoComplete="name"
                    maxLength={100}
                    value={values.name}
                    onChange={set("name")}
                  />
                </Field>

                <Field label="Phone Number" htmlFor="appt-phone" error={err("phone")}>
                  <input
                    id="appt-phone"
                    ref={phoneRef}
                    className={controlClass}
                    placeholder="Phone Number"
                    aria-invalid={Boolean(err("phone"))}
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={20}
                    value={values.phone}
                    onChange={set("phone")}
                  />
                </Field>

                <Field
                  label="Treatment Interested In"
                  htmlFor="appt-treatment"
                  error={err("treatment")}
                  active={prefilled}
                >
                  <ChevronDown
                    className="pointer-events-none absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 text-white/60"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <select
                    id="appt-treatment"
                    ref={treatmentRef}
                    className={cn(controlClass, "cursor-pointer truncate pr-7", !values.treatment && "text-white/35")}
                    aria-invalid={Boolean(err("treatment"))}
                    value={values.treatment}
                    onChange={set("treatment")}
                  >
                    <option value="" className="bg-white text-ink">
                      Treatment Interested In
                    </option>
                    {treatmentLinks.map((t) => (
                      <option key={t.href ?? t.label} value={t.label} className="bg-white text-ink">
                        {t.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Preferred Date" htmlFor="appt-date" error={err("date")}>
                  <input
                    id="appt-date"
                    ref={dateRef}
                    type="date"
                    min={today}
                    className={cn(
                      controlClass,
                      "[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100",
                      !values.date && "text-white/35",
                    )}
                    aria-invalid={Boolean(err("date"))}
                    value={values.date}
                    onChange={set("date")}
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
                <label className="flex max-w-[400px] cursor-pointer items-start gap-3 text-[13.5px] leading-[1.6] text-white/65">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setErrors((prev) => (prev.consent ? { ...prev, consent: undefined } : prev));
                    }}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[3px] border transition-colors duration-200",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-gold/60 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-brand",
                      consent ? "border-gold bg-gold" : err("consent") ? "border-[#ffb4a8]" : "border-white/40",
                    )}
                  >
                    <Check
                      className={cn("h-6 w-6 text-ink transition-transform duration-200", consent ? "scale-100" : "scale-0")}
                      strokeWidth={3.5}
                    />
                  </span>
                  I agree to receive appointment confirmations and updates via call, SMS, or WhatsApp.
                </label>

                {/* Matches the footer CTA: 48px height, 26px padding, 14.5px semibold,
                    4px radius, arrow that nudges right on hover. Colours are inverted
                    (gold fill) because this section already sits on the brand colour. */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileTap={submitting ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group inline-flex h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-[4px]! bg-gold px-[26px] text-[14.5px] font-semibold text-ink transition-colors duration-300 hover:bg-white disabled:cursor-wait disabled:opacity-80 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-[16px] w-[16px] animate-spin" strokeWidth={2} aria-hidden />
                      Booking...
                    </>
                  ) : done ? (
                    <>
                      <Check className="h-[16px] w-[16px]" strokeWidth={2.5} aria-hidden />
                      Booked
                    </>
                  ) : (
                    <>
                      Book an Appointment
                      <ArrowRight
                        className="h-[16px] w-[16px] transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </>
                  )}
                </motion.button>
              </div>

              {err("consent") ? (
                <p className="mt-4 text-[13px] text-[#ffb4a8]" role="alert">
                  {err("consent")}
                </p>
              ) : null}

              <AnimatePresence>
                {done && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-6 flex items-center gap-2.5 text-[14.5px] text-white"
                    role="status"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-ink">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    </span>
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