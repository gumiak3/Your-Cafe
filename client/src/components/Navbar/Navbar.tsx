import ListElement from "./ListElement";
import { listElementDataLeft } from "./ListElement.data";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full" role="navigation">
      <ul className="left-side-nav flex h-full items-center w-full justify-start">
        {listElementDataLeft.map((element, index) => (
          <ListElement {...element} key={`left-${index}`} />
        ))}
      </ul>
      <ul className="right-side-nav w-full flex justify-end">
        <ListElement
          href={"/SignIn"}
          content={"SignIn"}
          icon={faUser}
          hoverSneakPeek={true}
        />
      </ul>
    </nav>
  );
}
