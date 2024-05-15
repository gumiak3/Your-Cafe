import { LeftSideMenu } from "./LeftSideMenu/LeftSideMenu";
import { Route, Routes } from "react-router-dom";
import { ReservationsManagement } from "./Content/ReservationsManagement";

export function AdminPanel() {
  return (
    <section className="flex">
      <LeftSideMenu />
      <Routes>
        <Route element={<ReservationsManagement />} path="/Reservations" />
      </Routes>
    </section>
  );
}
