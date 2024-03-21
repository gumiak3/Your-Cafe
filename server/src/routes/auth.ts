import express from "express";
import { RegisterValidator } from "../../../sharedEntities/registerValidator";
import bcrypt from "bcrypt";
import { db } from "../server";
import { User } from "../entities/User";
import { validateStatus } from "../../../sharedEntities/common";

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
  user.isValid = validator.validate(
    user.username,
    user.email,
    user.password,
    user.password,
  );
  // if (
  //   Object.values(user.isValid).every(
  //     (valid) => valid !== validateStatus.correct,
  //   )
  // ) {
  //   return validator.getValids();
  // }
  user.isTaken = await db.isEmailTaken(user.email);
  if (user.isTaken) {
    validator.emailIsTaken();
    return res.send(validator.getValids());
  }
  user.password = await hashPassword(user.password, 10);
  const success = await db.insertUser(user);
  if (!success) return;
  console.log(validator.getValids());
  return validator.getValids();
});
