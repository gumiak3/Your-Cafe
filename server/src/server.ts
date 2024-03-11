import express, { Express, Request, Response } from "express";
import { hashPassword, router as authRoute } from "./routes/auth";
import { Database } from "./database";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());

app.use("/api/user", authRoute);

const db = Database.getInstance();

async function users() {
  const users = await db.getUsers();
}
app.listen(5000, () => console.log("Server running on port 5000"));
