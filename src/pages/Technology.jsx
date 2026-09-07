import { Helmet } from "react-helmet-async";
import { Cpu, Microscope, Radiation, ScanLine, Sparkles, Wand2 } from "lucide-react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";

const tech = [
  { icon: ScanLine, title: "Intraoral 3D Scanners", body: "Digital impressions replace messy trays for a precise, comfortable fit." },
  { icon: Radiation, title: "CBCT & Digital X-rays", body: "Low-radiation 3D imaging for accurate implant and surgical planning." },
  { icon: Wand2, title: "Dental Lasers", body: "Soft and hard tissue lasers for less bleeding and faster healing." },
  { icon: Cpu, title: "CAD/CAM Milling", body: "Same-day crowns designed and milled in-house with digital precision." },
  { icon: Microscope, title: "Surgical Magnification", body: "Microscopes and loupes for detailed endodontic and surgical work." },
  { icon: Sparkles, title: "Digital Smile Design", body: "Preview and approve your new smile before treatment begins." },
];

export function Technology() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Dental Technology | Scanners, CBCT & Lasers — The Dental Park</title>
        <meta
          name="description"
          content="Intraoral scanners, CBCT imaging, dental lasers and CAD/CAM milling — the technology behind precise, comfortable dentistry at The Dental Park."
        />
        <meta property="og:title" content="Our Dental Technology | The Dental Park" />
        <meta
          property="og:description"
          content="Scanners, CBCT, lasers and CAD/CAM milling for precise, comfortable care."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/technology" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/technology" />
      </Helmet>

      <PageHeader
        eyebrow="Technology"
        title="Precision Dentistry, Powered by Technology"
        description="Digital workflows let us diagnose earlier, treat more conservatively and show you exactly what to expect before we begin."
        crumbs={[{ label: "Technology" }]}
      />
      <section className="bg-surface py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tech.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-3xl border border-line bg-white p-6">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-light">
                  <Icon className="h-6 w-6 text-brand" strokeWidth={1.5} aria-hidden />
                </span>
                <h2 className="mt-5 text-[18px] font-semibold text-ink">{title}</h2>
                <p className="mt-2 text-[14.5px] leading-[1.75] text-body">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}