import Cookies from "js-cookie";

export type updateReservationParams = {
  id: number;
  userId: number;
  numberOfPeople: number;
  extraInformation: string;
  reservationDate: string;
  reservationTime: string;
  status: string;
};
export async function updateReservation(params: updateReservationParams) {
  const id = params.id;
  // @ts-ignore
  delete params.id;

  params.reservationDate = new Date(params.reservationDate).toLocaleDateString(
    "en-CA",
  );
  console.log(params);
  const authToken = Cookies.get("_auth");
  if (!authToken) {
    console.error("User is not authorized");
    return;
  }
  try {
    const response = await fetch(`/api/admin/update_reservation/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
