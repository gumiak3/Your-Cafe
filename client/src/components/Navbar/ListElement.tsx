import { ListElementProps } from "../../types/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SneakPeek from "./SneakPeek";
import { hover } from "@testing-library/user-event/dist/hover";
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
      className="relative flex justify-center hover:text-orange-400 text-black"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <a className="px-4 w-full" href={href}>
        {icon ? <FontAwesomeIcon icon={icon} /> : content}
      </a>
      {isHovering && hoverSneakPeek ? <SneakPeek>{content}</SneakPeek> : null}
    </li>
  );
}
