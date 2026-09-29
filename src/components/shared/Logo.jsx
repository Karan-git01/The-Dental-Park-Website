import { Link } from "react-router-dom";
import logoDark from "../../assets/images/logos/logo_dark.webp";
import logoWhite from "../../assets/images/logos/logo_white.webp";

export function Logo({ className = "", variant = "dark" }) {
  const src = variant === "light" ? logoDark : logoWhite;

  return (
    <Link
      to="/"
      aria-label="The Dental Park home"
      className={`flex items-center gap-2 ${className}`}
    >
      <img src={src} alt="" className="h-9 w-9" aria-hidden="true" />
      <span
        className={`text-sm font-semibold ${
          variant === "light" ? "text-white" : "text-neutral-900"
        }`}
      >
        The Dental Park
      </span>
    </Link>
  );
}