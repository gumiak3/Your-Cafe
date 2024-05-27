import { LeftSideMenu } from "./LeftSideMenu/LeftSideMenu";
import { Route, Routes } from "react-router-dom";
import { ReservationsManagement } from "./Content/ReservationsManagement";
import { AdminHeader } from "./AdminHeader";
import { ToastContainer } from "react-toastify";

export function AdminPanel() {
  return (
    <section className="flex overflow-y-hidden">
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
