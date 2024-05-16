import express from "express";
import { db } from "../../server";
import { isAdmin } from "../auth";

export const router = express.Router();

router.post("/reservations", isAdmin, async (req, res) => {
  try {
    const { page, limit } = req.body;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    const reservations = await db.getReservations(offset, limit);

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
