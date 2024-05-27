import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IAdminMenuListElement {
  href: string;
  content: string;
  icon?: IconDefinition;
  className?: string;
}
export default function AdminMenuListElement({
  content,
  href,
  icon,
  className,
}: IAdminMenuListElement) {
  return (
    <li className={`relative hover:text-orange-400 ${className}`}>
      <Link className="w-full flex items-center gap-4" to={href}>
        {icon ? <FontAwesomeIcon icon={icon} /> : null}
        {content}
      </Link>
    </li>
  );
}
