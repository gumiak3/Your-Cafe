import express from "express";
import { db } from "../server";
import { BookingController } from "../entities/BookingController";
export const router = express.Router();

function isBooked() {}

function convertIntoInteraces(opening_time: string, closing_time: string) {}

router.post("/booking_hours", async (req, res) => {
  const { date } = req.body;
  const bookingController = new BookingController();
  const dayReservations = await db.getDayReservations(date);
  // todo: get specific opening_time and closing_time from database for specific day depends on the date which user provided.
  // todo: convect it into a array of objects {hour: 9:30, isBooked = true/false} for specific day
  // todo: return it to the user
  const weekDay = bookingController.convertWeekDayToString(
    new Date(date).getDay(),
  );
  const dbOpeningHours = await db.getOpeningHours(weekDay);
  if (!dbOpeningHours) {
    return res.status(404).json({ error: "Couldn't fetch a opening hours" });
  }

  const dbDailyReservations = await db.getDailyReservations(date);
  if (!dbDailyReservations) {
    return res
      .status(404)
      .json({ error: "Couldn't fetch a daily reservations" });
  }

  const timeStamps = bookingController.getBookingTimeStamps(
    dbOpeningHours,
    dbDailyReservations,
  );

  console.log(dbDailyReservations);
  return res.status(200).json(timeStamps);
});
