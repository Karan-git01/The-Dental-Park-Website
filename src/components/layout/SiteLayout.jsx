// src/components/layout/SiteLayout.jsx
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFab } from "../shared/WhatsAppFab";

export function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}