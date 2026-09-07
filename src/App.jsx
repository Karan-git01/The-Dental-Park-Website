import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Gallery } from "./pages/Gallery";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Clinics } from "./pages/Clinics";
import { Doctors } from "./pages/Doctors";
import { Contact } from "./pages/Contact";
import { Faq } from "./pages/Faq";
import { Technology } from "./pages/Technology";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { TreatmentsIndex } from "./pages/TreatmentsIndex";
import { TreatmentPage } from "./pages/TreatmentPage";

function App() {
  // Mounts the single global Lenis instance for the app's lifetime.
  // Section 35: initialized centrally here, not inside individual pages
  // or sections.
  useSmoothScroll();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/clinics" element={<Clinics />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/treatments" element={<TreatmentsIndex />} />
      <Route path="/treatments/:slug" element={<TreatmentPage />} />
    </Routes>
  );
}

export default App;