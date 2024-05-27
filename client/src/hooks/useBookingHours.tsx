import { useEffect, useState } from "react";

export interface IBookingHours {
  date: string;
  timeStamps: {
    isBooked: boolean;
    time: string;
  }[];
}

export const fetchBookingHours = async (date: Date) => {
  try {
    const response = await fetch("../api/booking/booking_hours", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date.toLocaleDateString("en-CA"),
      }),
    });
    return await response.json();
  } catch (err) {}
};

const useBookingHours = (date: Date) => {
  const [bookingHours, setBookingHours] = useState<IBookingHours>();
  const [loading, setLoading] = useState(true);

  const fetchBookingHours = async (date: Date) => {
    try {
      const response = await fetch("../api/booking/booking_hours", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date.toLocaleDateString("en-CA"),
        }),
      });
      const data = await response.json();
      setBookingHours(data);
      setLoading(false);
    } catch (err) {}
  };
  useEffect(() => {
    fetchBookingHours(date);
  }, []);

  return { bookingHours, fetchBookingHours, loading };
};

export default useBookingHours;
