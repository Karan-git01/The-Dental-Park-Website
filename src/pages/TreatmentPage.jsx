import { useParams } from "react-router-dom";
import { SiteLayout } from "../components/layout/SiteLayout";
import { TreatmentDetail } from "../components/sections/TreatmentDetail";
import { treatmentBySlug } from "../data/treatments";

export function TreatmentPage() {
  const { slug } = useParams();
  const treatment = treatmentBySlug(slug);

  if (!treatment) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[720px] px-5 py-24 text-center">
          <h1 className="font-display text-[28px] font-bold text-ink">Treatment not found</h1>
          <p className="mt-3 text-body">The treatment you're looking for isn't available.</p>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <TreatmentDetail treatment={treatment} />
    </SiteLayout>
  );
}

// SEO metadata for this route — head data previously supplied via
// TanStack Start's `head()` + `loader()`. Not yet wired up (Phase 9 /
// Section 26 — SEO mechanism for React Router not yet decided). The
// per-treatment title/description/OG/JSON-LD were dynamic (built from
// loaderData), so once an SEO approach is picked this will need to
// read `treatment` inside the component rather than being a static
// export like the other pages' meta objects. Flagging so it isn't
// forgotten under a different shape than Testimonials/TreatmentsIndex.