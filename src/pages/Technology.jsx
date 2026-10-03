import { Cpu, Microscope, Radiation, ScanLine, Sparkles, Wand2 } from "lucide-react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { PageHeader } from "../components/shared/PageHeader";
import { Reveal } from "../components/shared/Reveal";
import { Seo } from "../components/seo/Seo";
import { breadcrumbSchema } from "../lib/schema";

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
      <Seo path="/technology" schema={breadcrumbSchema("/technology")} />

      <PageHeader
        eyebrow="Technology"
        title="Precision Dentistry, Powered by Technology"
        description="Digital workflows let us diagnose earlier, treat more conservatively and show you exactly what to expect before we begin."
        crumbs={[{ label: "Technology" }]}
      />

      <section className="bg-white py-16 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {tech.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 90} className="h-full">
                <article className="group flex h-full flex-col rounded-[24px] border border-line bg-white p-8 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/40 hover:shadow-[0_24px_48px_-32px_rgba(16,24,40,0.18)] motion-reduce:transition-none lg:p-10">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h2 className="mt-12 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink lg:mt-16 lg:text-[28px]">
                    {title}
                  </h2>
                  <p className="mt-4 max-w-[40ch] text-[15.5px] leading-[1.7] text-body">{body}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}