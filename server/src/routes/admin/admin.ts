import express from "express";
import { db } from "../../server";
import { isAdmin } from "../auth";
import { DataConverter } from "../../entities/DataConverter";

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

router.post("/update_reservation/:id", isAdmin, (req, res) => {
  try {
    const reservationId = Number(req.params.id);
    const reservation = req.body;
  } catch (err) {}
});
