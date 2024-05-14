import express from "express";
import { db } from "../server";
import { BookingController } from "../controllers/booking/BookingController";
import {
  BookTableValidator,
  validBookTableParams,
} from "../entities/booking/BookTableValidator";
import { User } from "../entities/user/User";
import { validateStatus } from "../../../client/src/types/common";

export const router = express.Router();

export interface reservationRequest {
  date: string;
  email: string;
  phoneNumber: string;
  time: string;
  username: string;
  extraInfo: string;
  user: false | number; // false or user_id
}

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
  const reservationReq = {
    date: req.body.date,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    time: req.body.time,
    username: req.body.username,
    extraInfo: req.body.extraInfo,
    user: req.body.user,
    numberOfGuests: req.body.numberOfGuests,
  };
  const bookTableValidator = new BookTableValidator();
  try {
    const isValid: validBookTableParams =
      await bookTableValidator.validateRequestParams(
        reservationReq.date,
        reservationReq.email,
        reservationReq.phoneNumber,
        reservationReq.time,
        reservationReq.username,
        reservationReq.numberOfGuests,
      );

    if (
      !Object.values(isValid).every((item) => item === validateStatus.correct)
    )
      return res.status(400).json({ message: "failed", isValid });

    const success = await db.insertReservation(reservationReq);

    if (!success)
      return res
        .status(400)
        .json({ error: "Failed to add new reservation to database" });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong with connection with database" });
  }

  /*
  todo:
    1. Front: if email is taken give message and prevent from sending post to server
    2. Insert Guest to database
   */
});
