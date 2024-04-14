import { useState, useEffect } from "react";
export function useBookingHours() {
  const [openHours, setOpenHours] = useState([]);
  useEffect(() => {
    const fetchBookingHours = async () => {
      try {
        const response = await fetch("booking/booking_hours", {
          method: "post",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch booking hours");
        }
        const data = await response.json();
        setOpenHours(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookingHours();
  }, []);
  return openHours;
}
