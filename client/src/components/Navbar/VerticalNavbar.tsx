import { profileListElementData } from "./ProfileListElement.data";
import VerticalListElement from "./VerticalListElement";
export default function VerticalNavbar() {
  return (
    <nav
      className="absolute z-50 bg-white border border-gray-200 p-2 text-black"
      role="navigation"
    >
      <ul className="">
        {profileListElementData.map((element, index) => (
          <VerticalListElement {...element} key={`vetical-${index}`} />
        ))}
      </ul>
    </nav>
  );
}
