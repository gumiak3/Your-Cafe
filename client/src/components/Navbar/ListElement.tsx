import { ListElementProps } from "../../types/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SneakPeek } from "./SneakPeek";
import { hover } from "@testing-library/user-event/dist/hover";
const ListElement: React.FC<ListElementProps> = ({
  content,
  href,
  icon,
  hoverSneakPeek,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <li
      className="relative flex justify-center"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <a className="px-4 w-full" href={href}>
        {icon ? <FontAwesomeIcon icon={icon} /> : content}
      </a>
      {isHovering && hoverSneakPeek ? <SneakPeek>{content}</SneakPeek> : null}
    </li>
  );
};

export default ListElement;
