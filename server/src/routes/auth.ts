import express from "express";
import { UserValidator } from "../entities/UserValidator";
import bcrypt from "bcrypt";
import { db } from "../server";
import { User } from "../entities/User";

export const router = express.Router();

export async function hashPassword(password: string, saltRounds: number) {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.error("Couldn't bcypt the password");
  }
}
router.post("/register", async (req, res) => {
  const validator = new UserValidator();
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    type: "client",
  });
  validator.validate(
    newUser.username,
    newUser.email,
    newUser.password,
    newUser.password,
  );
  const isTaken = await db.isEmailTaken(newUser.email);
  if (isTaken) {
    validator.emailIsTaken();
    return res.send(validator.getValids());
  }
  newUser.password = await hashPassword(newUser.password, 10);
  const success = await db.insertUser(newUser);
  if (!success) return;
  return res.send(validator.getValids());
});

async function comparePasswords(userPassword, dbPassword) {
  try {
    const result = await bcrypt.compare(userPassword, dbPassword);
    return result;
  } catch (err) {
    console.error(`Error comparing passwords: ${err}`);
    return false;
  }
}

router.post("/signin", async (req, res) => {
  const user = new User({
    username: undefined,
    password: req.body.password,
    email: req.body.email,
    type: undefined,
  });
  try {
    const userFetched = await db.getUser(user.email);
    const userCorrectness = await comparePasswords(
      user.password,
      userFetched.password_hash,
    );
  } catch (err) {
    console.error("something went wrong");
  }
});
