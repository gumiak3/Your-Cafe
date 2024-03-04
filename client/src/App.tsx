import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <main className="min-h-screen text-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />}></Route>
        </Routes>
      </main>
    </>
  );
}
