import ListElement from "./ListElement";
import { listElementDataLeft, listElementDataRight } from "./ListElement.data";
export const Navbar = () => {
  return (
    <nav className="flex justify-between w-full ml-4" role="navigation">
      <ul className="left-side-nav flex h-full w-full justify-start">
        {listElementDataLeft.map((element) => (
          <ListElement {...element} />
        ))}
      </ul>
      <ul className="right-side-nav w-full flex justify-end">
        {listElementDataRight.map((element) => (
          <ListElement {...element} />
        ))}
      </ul>
    </nav>
  );
};
