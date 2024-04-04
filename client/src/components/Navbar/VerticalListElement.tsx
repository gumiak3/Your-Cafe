import { ListElementProps } from "../../types/common";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function VerticalListElement({
  content,
  href,
}: {
  content: string;
  href: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <li className="relative hover:text-orange-400 text-black">
      <Link to={href}>{content}</Link>
    </li>
  );
}
