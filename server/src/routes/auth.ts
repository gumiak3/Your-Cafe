import express from "express";
import { UserValidator } from "../entities/UserValidator";
import bcrypt from "bcrypt";
import { db } from "../server";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

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
    id: 0,
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
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await db.getUser(email);
    if (!user) {
      return res.status(401).json({ error: "No match for that user" });
    }
    const userCorrectness = await comparePasswords(password, user.password);
    if (!userCorrectness) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(201).json({ token });
  } catch (err) {
    console.error("something went wrong");
    return res.status(500).json({ error: "login failed" });
  }
});
