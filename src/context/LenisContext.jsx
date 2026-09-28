import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    setReady(true);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {ready && children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useLenis must be used within LenisProvider");
  return ctx;
}