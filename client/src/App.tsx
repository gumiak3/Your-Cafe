import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import logo from './assets/coffee-image.jpg'
import Logo from "./pages/Logo";

export default function App() {
  return (
    <main className="min-h-screen text-black">
        <header className="flex pt-4 pb-4 justify-start max-w-7xl m-auto ">
            <Logo/>
            <Navbar />
        </header>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />}></Route>
        </Routes>
    </main>
  );
}
