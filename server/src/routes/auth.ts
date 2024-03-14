import express from "express";
import { RegisterValidator } from "./registerValidator";
import bcrypt from "bcrypt";
import { db } from "../server";

export const router = express.Router();

export async function hashPassword(password: string, saltRounds: number) {
  try {
    const cryptedPassword = await bcrypt.hash(password, saltRounds);
    const result = cryptedPassword;
    return result;
  } catch (err) {
    console.error("Couldn't bcypt the password");
  }
}
router.post("/register", async (req, res) => {
  const validator = new RegisterValidator();
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    type: "normal",
  };
  const isTaken = await db.isEmailTaken(user.email);
  if (!validator.validateUser(user) || isTaken) {
    return console.error("User is invalid");
  }
  const cryptedPassoword = await hashPassword(user.password, 10);
  user.password = cryptedPassoword;
  db.insertUser(user);
  res.send("Successfully added user");
});
