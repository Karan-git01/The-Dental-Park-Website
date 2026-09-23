import { Link } from "react-router-dom";
import logoTooth from "../../assets/images/logos/logo-tooth.svg";

export function Logo({ className = "", variant = "dark" }) {
  return (
    <Link
      to="/"
      aria-label="The Dental Park home"
      className={`flex items-center gap-2 ${className}`}
    >
      <img src={logoTooth} alt="" className="h-9 w-9" aria-hidden="true" />
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