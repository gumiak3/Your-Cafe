import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import Register from "./pages/Register/Register";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Booking from "./pages/Booking/Booking";
import { AdminRoute } from "./utils/AdminRoute";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel";
import Profile from "./pages/Profile/Profile";
export default function App() {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith("/AdminPanel");
  return (
    <main className="min-h-screen text-black">
      {!isAdminPanel && <Header />}
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="/AdminPanel/*" element={<AdminPanel />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route
          path="/Profile"
          element={<AuthOutlet fallbackPath={"/SignIn"} />}
        >
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route path="/booking" element={<Booking />} />

        <Route path="/Register" element={<Register />}></Route>
      </Routes>
    </main>
  );
}
