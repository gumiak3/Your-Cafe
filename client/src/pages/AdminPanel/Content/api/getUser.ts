import Cookies from "js-cookie";

export interface IUser {
  email: string;
  id: number;
  type: string;
  username: string;
  phoneNumber: string;
}
interface getUserResponse {
  message: string;
  user?: IUser;
}
export async function getUser(userId: number) {
  try {
    const authToken = Cookies.get("_auth");
    if (!authToken) return;
    const response = await fetch(`/api/admin/get_user/${userId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      return console.error(`Couldn't fetch a user`);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}
