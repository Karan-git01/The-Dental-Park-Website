import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Gallery } from "./pages/Gallery";
import { Clinics } from "./pages/Clinics";
import { Doctors } from "./pages/Doctors";
import { Contact } from "./pages/Contact";
import { Faq } from "./pages/Faq";
import { Technology } from "./pages/Technology";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { TreatmentsIndex } from "./pages/TreatmentsIndex";
import { TreatmentPage } from "./pages/TreatmentPage";
import { LenisProvider } from "./context/LenisContext";
import { useScrollToHash } from "./hooks/useScrollToHash";

function App() {
  // Requires this component to render inside <BrowserRouter> (it should,
  // via main.jsx) since it relies on useLocation() internally. Wired in
  // once here so every /#anchor link across the site scrolls correctly,
  // including when already on the page the anchor lives on.
  useScrollToHash();

  return (
    <LenisProvider>
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
    </LenisProvider>
  );
}

export default App;