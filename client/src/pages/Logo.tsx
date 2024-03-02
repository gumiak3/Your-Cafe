import logo from "../assets/coffee-image.jpg";
import React from "react";

export default function Logo(){
    return (
        <span>
            <a href="/" className="w-full flex items-center gap-2">
                <img src={logo} alt="cafe's logo" width="50px" height="50px" className="cafe-logo"/>
                <span>YoursCafe</span>
            </a>
        </span>
    )
}