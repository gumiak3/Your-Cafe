import Logo from "../pages/Logo";
import Navbar from "./Navbar/Navbar";
import React from "react";

export default function Header() {
  return (
    <header className="flex pt-4 pb-4 justify-start max-w-7xl m-auto ">
      <Logo />
      <Navbar />
    </header>
  );
}
