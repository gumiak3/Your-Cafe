import express from "express";
import { UserValidator } from "../entities/user/UserValidator";
import bcrypt from "bcrypt";
import { db } from "../server";
import { User } from "../entities/user/User";
import jwt from "jsonwebtoken";

export const router = express.Router();

async function hasAccess(userId: number) {
  const user = await db.getUserById(userId);
  return user.type === "admin";
}
export const isAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // ['Bearer', 'token']
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    const access = await hasAccess(req.user.userId);
    if (!access) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  });
};

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
      expiresIn: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(201).json({ auth: true, token, user });
  } catch (err) {
    console.error("something went wrong");
    return res.status(500).json({ error: "login failed" });
  }
});

router.post("/refresh-token", (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired jwt token" });
    }
    console.log(decoded);
    const newToken = jwt.sign(
      { userId: decoded.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    return res.status(201).json({ auth: true, newToken });
  });
});
