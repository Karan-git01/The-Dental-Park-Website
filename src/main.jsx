import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const container = document.getElementById("root");

const app = (
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>
);

// Production pages are prerendered, so #root already contains HTML: hydrate it.
// In `npm run dev` (and for any route that was not prerendered) #root is empty,
// so render normally.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}