// src/components/sections/AppointmentForm.jsx
import { useEffect, useMemo, useRef, useState } from "react";
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
  "h-[62px] w-full rounded-xl border bg-white pl-12 pr-4 text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-muted-ink focus:-translate-y-0.5 focus:shadow-card focus:ring-4";
const okClass = "border-line hover:border-brand/40 focus:border-brand focus:ring-brand/15";
const badClass = "border-destructive/70 focus:border-destructive focus:ring-destructive/15";

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

  return (
    <section id="appointment" className="bg-white py-14 lg:py-20" aria-labelledby="appointment-heading">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
        <form
          onSubmit={submit}
          noValidate
          className="card-premium rounded-[24px] border border-line px-5 py-8 sm:px-8 lg:px-12 lg:py-12"
        >
          <h2
            id="appointment-heading"
            className="font-display text-[22px] font-bold leading-tight text-ink sm:text-[30px] lg:text-[36px]"
          >
            Book an Appointment at The Dental Park Near You
          </h2>
          <p className="mt-3 max-w-[620px] text-[14.5px] leading-[1.7] text-body">
            Takes under a minute. We&rsquo;ll call you back to confirm your slot — no payment needed to book.
          </p>

          <div className="mt-7 grid gap-4 sm:gap-5 lg:grid-cols-3">
            <div>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-4 top-[31px] h-5 w-5 -translate-y-1/2 text-brand"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <input
                  ref={nameRef}
                  className={cn(fieldClass, err("name") ? badClass : okClass)}
                  placeholder="Full Name"
                  aria-label="Full Name"
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
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-4 top-[31px] h-5 w-5 -translate-y-1/2 text-brand"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <input
                  ref={phoneRef}
                  className={cn(fieldClass, err("phone") ? badClass : okClass)}
                  placeholder="Phone Number"
                  aria-label="Phone Number"
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
              <div className="relative">
                <Smile
                  className="pointer-events-none absolute left-4 top-[31px] h-5 w-5 -translate-y-1/2 text-brand"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-[31px] h-5 w-5 -translate-y-1/2 text-ink"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <select
                  ref={treatmentRef}
                  className={cn(
                    fieldClass,
                    err("treatment") ? badClass : okClass,
                    "appearance-none pr-11",
                    !values.treatment && "text-muted-ink",
                    prefilled && "border-gold ring-4 ring-gold/25",
                  )}
                  aria-label="Treatment Interested In"
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
              <div className="relative">
                <CalendarDays
                  className="pointer-events-none absolute left-4 top-[31px] h-5 w-5 -translate-y-1/2 text-brand"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <input
                  ref={dateRef}
                  type="date"
                  min={today}
                  className={cn(fieldClass, err("date") ? badClass : okClass, !values.date && "text-muted-ink")}
                  aria-label="Preferred Appointment Date"
                  aria-invalid={Boolean(err("date"))}
                  value={values.date}
                  onChange={set("date")}
                />
              </div>
              <FieldError field="date" />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-[62px] w-full items-center justify-center gap-2.5 rounded-xl bg-brand text-[17px] font-semibold text-white transition-all duration-300 glow-hover hover:bg-brand-hover disabled:cursor-wait disabled:opacity-80"
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
            </button>
          </div>

          <label className="mt-6 flex items-start gap-3 text-[14px] leading-snug text-ink sm:items-center sm:text-[15px]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                setErrors((prev) => (prev.consent ? { ...prev, consent: undefined } : prev));
              }}
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[6px] border bg-white bg-center bg-no-repeat transition-colors checked:border-brand checked:bg-brand sm:mt-0",
                err("consent") ? "border-destructive/70" : "border-line",
              )}
              style={{
                backgroundImage: consent
                  ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E\")"
                  : undefined,
                backgroundSize: "14px 14px",
              }}
            />
            I agree to receive appointment confirmations and updates via call, SMS, or WhatsApp.
          </label>
          <FieldError field="consent" />

          {done && (
            <p
              className="mt-4 flex items-center gap-2.5 rounded-xl border border-brand/25 bg-brand-light/60 px-4 py-3 text-[14.5px] font-medium text-brand motion-safe:animate-[fade-in_0.4s_ease-out]"
              role="status"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
              </span>
              Thanks! Our team will call you shortly to confirm your appointment.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}