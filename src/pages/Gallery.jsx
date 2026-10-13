import { SiteLayout } from "../components/layout/SiteLayout";
import { SmileGallery } from "../components/sections/SmileGallery";
import { Seo } from "../components/seo/Seo";

export function Gallery() {
  return (
    <SiteLayout>
      {/* Title and description come from src/data/seo.js ("/gallery") */}
      <Seo path="/gallery" />
      <SmileGallery />
    </SiteLayout>
  );
}