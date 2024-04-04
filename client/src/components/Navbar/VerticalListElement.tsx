import { Link } from "react-router-dom";
import { VerticalListElementProps } from "../../types/common";

export default function VerticalListElement({
  content,
  href,
  onClick,
}: VerticalListElementProps) {
  return (
    <li className="relative hover:text-orange-400 text-black">
      <Link onClick={onClick} to={href}>
        {content}
      </Link>
    </li>
  );
}
