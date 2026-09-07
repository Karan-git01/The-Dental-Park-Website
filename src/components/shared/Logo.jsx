import { Link } from "react-router-dom";
import logoTooth from "../../assets/images/logos/logo-tooth.svg";

export function Logo({ className = "" }) {
  return (
    <Link to="/" aria-label="The Dental Park home" className={`flex items-center gap-2 ${className}`}>
      <img src={logoTooth} alt="" className="h-9 w-9" aria-hidden="true" />
      <span className="text-18px font-semibold text-neutral-900">The Dental Park</span>
    </Link>
  );
}