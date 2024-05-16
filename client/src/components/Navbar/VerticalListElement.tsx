import { Link } from "react-router-dom";
import { VerticalListElementProps } from "../../types/common";

export default function VerticalListElement({
  content,
  href,
  onClick,
}: VerticalListElementProps) {
  return (
    <Link onClick={onClick} to={href}>
      <li className="relative hover:text-orange-400 text-black inline-block min-w-32 p-2">
        {content}
      </li>
    </Link>
  );
}
