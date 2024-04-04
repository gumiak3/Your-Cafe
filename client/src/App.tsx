import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import Register from "./pages/Register/Register";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function App() {
  const auth = useAuthUser();

  return (
    <>
      <main className="min-h-screen text-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />

          <Route
            path="/Profile"
            element={<AuthOutlet fallbackPath={"/SignIn"} />}
          >
            <Route path="/Profile" element={"/Profile"} />
          </Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </main>
    </>
  );
}
