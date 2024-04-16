import { useState, useEffect } from "react";
import { ITimeSelector } from "../types/common";
export function useBookingHours() {
  const [openHours, setOpenHours] = useState<ITimeSelector[]>([]);

  function convertToITimeSelectorFormat(
    data: {
      closing_time: string;
      day_of_the_week: string;
      opening_time: string;
    }[],
  ) {
    const output: ITimeSelector[] = [];
    data.forEach((item) => {
      const open = {
        hour: Number(item.opening_time.slice(0, 2)),
        minutes: Number(item.opening_time.slice(3, item.opening_time.length)),
      };
      const close = {
        hour: Number(item.closing_time.slice(0, 2)),
        minutes: Number(item.closing_time.slice(3, item.opening_time.length)),
      };
      output.push({
        weekDay: item.day_of_the_week,
        openHours: open,
        closeHours: close,
      });
    });
    return output;
  }

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
        console.log(data);
        setOpenHours(convertToITimeSelectorFormat(data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookingHours();
  }, []);
  return openHours;
}
