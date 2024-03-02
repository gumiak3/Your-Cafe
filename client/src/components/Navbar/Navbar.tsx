import ListElement from "./ListElement";
import { listElementDataLeft, listElementDataRight } from "./ListElement.data";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full ml-4" role="navigation">
      <ul className="left-side-nav flex h-full items-center w-full justify-start">
        {listElementDataLeft.map((element, index) => (
          <ListElement {...element} key={`left-${index}`}/>
        ))}
      </ul>
      <ul className="right-side-nav w-full flex justify-end">
        {listElementDataRight.map((element, index) => (
          <ListElement {...element} key={`right-${index}`}/>
        ))}
      </ul>
    </nav>
  );
}
