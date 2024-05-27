import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IUser } from "../pages/AdminPanel/Content/api/getUser";

const useGetUser = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<IUser>();
  const fetchUser = async () => {
    try {
      const authToken = Cookies.get("_auth");
      if (!authToken) {
        console.error("User is not authorized");
        return;
      }
      const response = await fetch(`/api/user/get_user/${userId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, fetchUser };
};

export default useGetUser;
