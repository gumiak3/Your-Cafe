import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useBookingHours from "./useBookingHours";

export type reservationType = {
  reservationId: number;
  userId: number;
  numberOfPeople: number;
  extraInformation: string;
  status: string;
  reservationTime: string;
  reservationDate: Date;
};

export type convertedReservationType = {
  id: number;
  userId: number;
  numberOfPeople: number;
  extraInformation: string;
  status: string;
  reservationTime: string;
  reservationDate: Date;
};

export function convertData(data: reservationType[]) {
  const newData: convertedReservationType[] = [];
  data.forEach((item) => {
    item.reservationDate = new Date(item.reservationDate);
    if (item.hasOwnProperty("reservationId")) {
      const id = item.reservationId;
      const date = item.reservationDate;
      // @ts-ignore
      delete item.reservationId;
      newData.push({ id: id, ...item });
    }
  });
  return newData;
}

const useReservationsData = () => {
  const [reservations, setReservations] = useState<convertedReservationType[]>(
    [],
  );
  const fetchReservations = async (page: number, limit: number) => {
    try {
      const authToken = Cookies.get("_auth");
      if (!authToken) {
        console.error("User is not authorized");
        return;
      }
      const response = await fetch("/api/admin/reservations", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          page: page,
          limit: limit,
        }),
      });
      const data = await response.json();
      setReservations(convertData(data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchReservations(1, 100);
  }, []);

  return { reservations, fetchReservations };
};

export default useReservationsData;
