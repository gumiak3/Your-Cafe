import express from "express";
import { db } from "../server";
import { BookingController } from "../entities/BookingController";
import { BookTableValidator } from "../entities/BookTableValidator";
export const router = express.Router();

function isBooked() {}

function convertIntoInteraces(opening_time: string, closing_time: string) {}

router.post("/booking_hours", async (req, res) => {
  const { date } = req.body;
  const bookingController = new BookingController();

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

  return res.status(200).json({ date: date, timeStamps });
});

router.post("/book_table", async (req, res) => {
  const { data, email, phoneNumber, time, user, username, extraInfo } =
    req.body;
  const bookTableValidator = new BookTableValidator();

  /*
  todo:
    1. validate data
      1.3 time -> make unit test
      1.4 user -> if user is logged in, connect the reservation with a user else user -> guest(add guest user to database)
    2. insert data to database:
      2.1
   */
});
