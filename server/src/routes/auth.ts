import express from "express";
import { RegisterValidator } from "../routes/registerValidator";
import bcrypt from "bcrypt";
import { db } from "../server";
import { User } from "../entities/User";

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
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    type: "client",
  });
  // return specific error that includes which input was wrong.
  user.isValid = validator.validateUser(user.getUserProps());
  user.isTaken = await db.isEmailTaken(user.email);
  if (!user.isValid || user.isTaken) {
    console.error("couldnt add ");
    return res.send({
      username: user.isValid.username,
      email: user.isValid.email,
      password: user.isValid.password,
      isTaken: user.isTaken,
    });
  }

  user.password = await hashPassword(user.password, 10);
  db.insertUser(user);
  return res.send({
    username: user.isValid.username,
    email: user.isValid.email,
    password: user.isValid.password,
    isTaken: user.isTaken,
  });
});
