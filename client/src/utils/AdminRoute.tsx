import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { IUserState } from "../types/common";
import { Navigate, Outlet } from "react-router-dom";

export function AdminRoute() {
  const user: IUserState | null = useAuthUser();
  return user?.access === "admin" ? <Outlet /> : <Navigate to="SignIn" />;
}
