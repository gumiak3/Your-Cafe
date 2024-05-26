import { useEffect, useState } from "react";
import { convertedReservationType } from "./useReservationsData";
import { fetchBookingHours, IBookingHours } from "./useBookingHours";
export interface ITimeOptions {
  [key: number]: string[];
}
export function getTimeOptions(reservations: convertedReservationType[]) {
  const newTimeOptions: ITimeOptions = {};
  reservations.forEach(async (reservation) => {
    const date = reservation.reservationDate;
    const timeStamps: IBookingHours = await fetchBookingHours(date);
    const options: string[] = [];
    timeStamps.timeStamps.forEach((item) => {
      options.push(item.time);
    });
    newTimeOptions[reservation.id] = options;
  });
  return newTimeOptions;
}

export async function getTimeOptionsForReservation(
  reservationDate: Date,
  reservationId: number,
) {
  const newOption: ITimeOptions = {};
  console.log(reservationDate);
  const timeStamps: IBookingHours = await fetchBookingHours(reservationDate);
  const options: string[] = [];
  timeStamps.timeStamps.forEach((item) => {
    options.push(item.time);
  });
  return { [reservationId]: options };
}

const useTimeOptions = (reservations: convertedReservationType[]) => {
  const [timeOptions, setTimeOptions] = useState<ITimeOptions[]>([]);
  function getTimeOptions(reservations: convertedReservationType[]) {
    const newTimeOptions: ITimeOptions[] = [];
    reservations.forEach(async (reservation) => {
      const date = reservation.reservationDate;
      const timeStamps: IBookingHours = await fetchBookingHours(date);
      const options: string[] = [];
      timeStamps.timeStamps.forEach((item) => {
        options.push(item.time);
      });
      newTimeOptions.push({
        [reservation.id]: options,
      });
    });
    setTimeOptions(newTimeOptions);
  }
  useEffect(() => {
    getTimeOptions(reservations);
  }, [reservations]);
  return { timeOptions, getTimeOptions };
};

export default useTimeOptions;
