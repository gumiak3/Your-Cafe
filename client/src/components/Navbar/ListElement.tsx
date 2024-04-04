import { ListElementProps } from "../../types/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import VerticalNavbar from "./VerticalNavbar";
export default function ListElement({
  content,
  href,
  icon,
  hoverSneakPeek,
}: ListElementProps) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <li
      className="relative hover:text-orange-400 text-black"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link className="px-4 w-full" to={href}>
        {icon ? <FontAwesomeIcon icon={icon} /> : content}
      </Link>
      {isHovering && hoverSneakPeek ? <VerticalNavbar /> : null}
    </li>
  );
}
