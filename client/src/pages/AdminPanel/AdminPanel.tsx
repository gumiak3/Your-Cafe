import { LeftSideMenu } from "./LeftSideMenu/LeftSideMenu";
import { Route, Routes } from "react-router-dom";
import { ReservationsManagement } from "./Content/ReservationsManagement";
import { AdminHeader } from "./AdminHeader";

export function AdminPanel() {
  return (
    <section className="flex">
      <LeftSideMenu />
      <div className="w-full">
        <AdminHeader />
        <Routes>
          <Route element={<ReservationsManagement />} path="/Reservations" />
        </Routes>
      </div>
    </section>
  );
}
