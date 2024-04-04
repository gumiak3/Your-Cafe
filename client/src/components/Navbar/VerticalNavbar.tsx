import { profileListElementData } from "./ProfileListElement.data";
import VerticalListElement from "./VerticalListElement";
import useSignOut from "react-auth-kit/hooks/useSignOut";
export default function VerticalNavbar() {
  const signOut = useSignOut();
  return (
    <nav
      className="absolute z-50 bg-white border border-gray-200 p-2 text-black"
      role="navigation"
    >
      <ul className="">
        {profileListElementData.map((element, index) => (
          <VerticalListElement {...element} key={`vertical-${index}`} />
        ))}
        <VerticalListElement
          content="SignOut"
          href={"/SignIn"}
          onClick={() => signOut()}
        />
      </ul>
    </nav>
  );
}
