import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <main className="min-h-screen text-white m-auto max-w-7xl">
      <header className="flex mt-7 justify-start">
        <h1>
          <a href="/">CoffeeShop</a>
        </h1>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />}></Route>
      </Routes>
    </main>
  );
}
