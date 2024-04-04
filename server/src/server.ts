import express from "express";
import { router as authRoute } from "./routes/auth";
import { Database } from "./database";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use("/api/user", authRoute);
app.use(cookieParser());

export const db = Database.getInstance();

app.listen(5000, () => console.log("Server running on port 5000"));
