import express from "express";
import { db } from "../server";
export const router = express.Router();

router.post("/booking_hours", async (req, res) => {
  const openingHours = await db.getOpeningHours();
  if (!openingHours) {
    res.status(404).json({ error: "Couldn't fetch a opening hours" });
  }
  return res.status(200).json(openingHours);
});
