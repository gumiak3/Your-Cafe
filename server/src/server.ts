import express, { Express, Request, Response } from "express";
import { hashPassword, router as authRoute } from "./routes/auth";
import { Database } from "./database";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());

app.use("/api/user", authRoute);

export const db = Database.getInstance();

app.listen(5000, () => console.log("Server running on port 5000"));
