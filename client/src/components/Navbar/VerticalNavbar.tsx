import { profileListElementData } from "./ProfileListElement.data";
import VerticalListElement from "./VerticalListElement";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import ListElement from "./ListElement";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { IUserState } from "../../types/common";
import { useEffect, useState } from "react";
export default function VerticalNavbar() {
  const user: IUserState | null = useAuthUser();
  const signOut = useSignOut();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);
  return (
    <nav
      className={`right-0 absolute z-50 bg-white border border-gray-200 text-black transition-opacity ${show ? "opacity-100" : "opacity-0"}`}
      role="navigation"
    >
      <ul className="p-0">
        {profileListElementData.map((element, index) => (
          <VerticalListElement {...element} key={`vertical-${index}`} />
        ))}
        {user?.access === "admin" && (
          <VerticalListElement href={"/AdminPanel"} content={"Admin Panel"} />
        )}
        <VerticalListElement
          content="SignOut"
          href={"/SignIn"}
          onClick={() => signOut()}
        />
      </ul>
    </nav>
  );
}
