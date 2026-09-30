// src/components/shared/PageTransition.jsx
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// Wraps each routed page. Old page fades/slides out quickly, then the new
// one fades/slides in. Kept short so navigation never feels slow.
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } }}
    >
      {children}
    </motion.div>
  );
}