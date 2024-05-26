import express from "express";
import { db } from "../server";
import { BookingController } from "../controllers/booking/BookingController";
import { BookTableValidator } from "../entities/booking/BookTableValidator";
import { validateStatus } from "../types/common";
import { User } from "../entities/user/User";

export const router = express.Router();

export interface reservationRequest {
  date: string;
  email: string | null;
  phoneNumber: string;
  time: string;
  username: string | null;
  extraInfo: string;
  user: false | number; // false or user_id
  numberOfGuests: number;
}
export type reservation = {
  user: User;
  numberOfGuests: number;
  extraInfo: string;
  status: string;
  time: string;
  date: string;
};
// todo: change it to return only string: HH:MM
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
  console.log(timeStamps);
  return res.status(200).json({ date: date, timeStamps });
});

export function isValid(object: Object) {
  return Object.values(object).every(
    (valid) => valid === validateStatus.correct,
  );
}

router.post("/book_table", async (req, res) => {
  const reservationReq: reservationRequest = {
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
  // todo: insert a phoneNumber to user database
  try {
    if (reservationReq.user) {
      const paramsValid = await bookTableValidator.validateUserRequestParams(
        reservationReq.date,
        reservationReq.phoneNumber,
        reservationReq.time,
        reservationReq.numberOfGuests,
      );
      if (!isValid(paramsValid)) {
        return res.status(400).json(paramsValid);
      }
      const user = new User(await db.getUserById(reservationReq.user));
      if (!user) {
        throw new Error(`Couldn't auth user`);
      }
      const newReservation: reservation = {
        user: user,
        numberOfGuests: reservationReq.numberOfGuests,
        extraInfo: reservationReq.extraInfo,
        status: "Waiting",
        time: reservationReq.time,
        date: reservationReq.date,
      };
      const reservationSuccess = await db.insertReservation(newReservation);
      if (!reservationSuccess) {
        throw new Error(`Couldn't add new reservation to database`);
      }
      return res.status(200).json({ message: "success" });
    } else {
      // guest user
      const paramsValid = await bookTableValidator.validateRequestParams(
        reservationReq.date,
        reservationReq.email,
        reservationReq.phoneNumber,
        reservationReq.time,
        reservationReq.username,
        reservationReq.numberOfGuests,
      );
      if (!isValid(paramsValid)) {
        return res.status(400).json(paramsValid);
      }
      // check if guest should log in
      const isEmailTaken = await db.isEmailTaken(reservationReq.email);
      if (isEmailTaken) {
        paramsValid.email = validateStatus.emailTaken;
        return res.status(400).json(paramsValid);
      }
      const guest = new User({
        id: 0,
        username: reservationReq.username,
        email: reservationReq.email,
        password: "",
        type: "guest",
      });
      const dbNewGuest = await db.insertUser(guest);
      if (!dbNewGuest) {
        throw new Error(`Couldn't add new user to database`);
      }
      const newReservation: reservation = {
        user: guest,
        numberOfGuests: reservationReq.numberOfGuests,
        extraInfo: reservationReq.extraInfo,
        status: "waiting for accept",
        time: reservationReq.time,
        date: reservationReq.date,
      };
      const reservationSuccess = await db.insertReservation(newReservation);
      if (!reservationSuccess) {
        throw new Error(`Couldn't add new reservation to database`);
      }
      return res.status(200).json({ message: "success" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
