import ListElement from "../../components/Navbar/ListElement";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function AdminHeader() {
  return (
    <header className="p-4">
      <nav
        className="flex justify-between items-center w-full"
        role="navigation"
      >
        <ul className="right-side-nav w-full flex justify-end">
          <ListElement
            href={"/SignIn"}
            content={"SignIn"}
            icon={faUser}
            hoverSneakPeek={true}
          />
        </ul>
      </nav>
    </header>
  );
}
