import express from "express";
import { RegisterValidator } from "./registerValidator";
import bcrypt from "bcrypt";

export const router = express.Router();

export async function hashPassword(password: string, saltRounds: number) {
  try {
    const cryptedPassword = await bcrypt.hash(password, saltRounds);
    const result = cryptedPassword.toString();
    return result;
  } catch (err) {
    console.error("Couldn't bcypt the password");
  }
}
router.post("/register", (req, res) => {
  const validator = new RegisterValidator();
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  if (!validator.validateUser(user)) {
    return console.error("xd");
  }
  const cryptedPassoword = hashPassword(user.password, 10);
  console.log(cryptedPassoword);
});
