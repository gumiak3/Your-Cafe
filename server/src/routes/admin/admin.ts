import express from "express";
import { db } from "../../server";
import { isAdmin } from "../auth";
import { DataConverter } from "../../entities/DataConverter";
import { BookTableValidator } from "../../entities/booking/BookTableValidator";
import {
  ReservationController,
  updateReservationParams,
} from "../../controllers/admin/ReservationController";
import { isValid } from "../bookingTable";

export const router = express.Router();

router.post("/reservations", isAdmin, async (req, res) => {
  try {
    const { page, limit } = req.body;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;
    const reservations = await db.getReservations(offset, limit);
    const dataConverter = new DataConverter();
    const convertedReservations = dataConverter.convertToCamel(reservations);
    res.status(200).json(convertedReservations);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/update_reservation/:id", isAdmin, async (req, res) => {
  try {
    const reservationId = Number(req.params.id);
    const reservation: updateReservationParams = req.body;
    reservation.reservationId = reservationId;
    // validate reservation params
    const controller = new ReservationController();
    const validated =
      await controller.validateUpdatingReservationParams(reservation);
    if (!isValid(validated)) {
      return res.status(201).json(validated);
    }
    // update reservation in database
    const success = await controller.updateReservation(reservation);
    // send information about succes
    if (!success) {
      return res.status(201).json({ message: "Couldn't update" });
    }
    return res.status(200).json({ message: "success" });
  } catch (err) {
    // failed
    return res.status(500).json({ error: err });
  }
});
