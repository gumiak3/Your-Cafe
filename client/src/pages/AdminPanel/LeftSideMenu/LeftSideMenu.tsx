import { listElements } from "./LeftSideMenu.data";
import AdminMenuListElement from "./AdminMenuListElement";
export function LeftSideMenu() {
  return (
    <nav className="bg-sky-950 min-h-screen text-white p-6 flex flex-col">
      <h1 className="font-bold text-2xl mb-10">Admin Panel</h1>
      <ul>
        {listElements.map((element, index) => {
          return (
            <AdminMenuListElement
              {...element}
              key={`admin-panel-menu-${index}`}
            />
          );
        })}
      </ul>
    </nav>
  );
}
