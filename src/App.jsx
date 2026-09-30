import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "motion/react";
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
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Terms } from "./pages/Terms";
import { LenisProvider } from "./context/LenisContext";
import { PageTransition } from "./components/shared/PageTransition";
import { useScrollToHash } from "./hooks/useScrollToHash";

function App() {
  // Requires this component to render inside <BrowserRouter> (it should,
  // via main.jsx) since it relies on useLocation() internally. Wired in
  // once here so every /#anchor link across the site scrolls correctly,
  // including when already on the page the anchor lives on.
  useScrollToHash();
  const location = useLocation();

  // Page change flow: old page fades out -> scroll jumps to top (unseen,
  // page is invisible at this point) -> new page fades in. Skipped when the
  // URL has a #anchor, since useScrollToHash handles that case.
  const resetScroll = () => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <LenisProvider>
      <MotionConfig reducedMotion="user">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={resetScroll}
        >
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/gallery"
              element={
                <PageTransition>
                  <Gallery />
                </PageTransition>
              }
            />
            <Route
              path="/clinics"
              element={
                <PageTransition>
                  <Clinics />
                </PageTransition>
              }
            />
            <Route
              path="/doctors"
              element={
                <PageTransition>
                  <Doctors />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/faq"
              element={
                <PageTransition>
                  <Faq />
                </PageTransition>
              }
            />
            <Route
              path="/technology"
              element={
                <PageTransition>
                  <Technology />
                </PageTransition>
              }
            />
            <Route
              path="/testimonials"
              element={
                <PageTransition>
                  <TestimonialsPage />
                </PageTransition>
              }
            />
            <Route
              path="/treatments"
              element={
                <PageTransition>
                  <TreatmentsIndex />
                </PageTransition>
              }
            />
            <Route
              path="/treatments/:slug"
              element={
                <PageTransition>
                  <TreatmentPage />
                </PageTransition>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PageTransition>
                  <PrivacyPolicy />
                </PageTransition>
              }
            />
            <Route
              path="/terms"
              element={
                <PageTransition>
                  <Terms />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </MotionConfig>
    </LenisProvider>
  );
}

export default App;