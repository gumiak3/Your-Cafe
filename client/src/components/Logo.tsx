import logo from "../assets/coffee-image.jpg";
import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <span className="px-4">
      <Link to="/" className="w-full flex justify-center items-center gap-2">
        <img
          src={logo}
          alt="cafe's logo"
          width="50px"
          height="50px"
          className="cafe-logo"
        />
        <span>YoursCafe </span>
      </Link>
    </span>
  );
}
