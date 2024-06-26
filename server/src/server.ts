import express from "express";
import { router as authRoute } from "./routes/auth";
import { router as bookingRoute } from "./routes/bookingTable";
import { router as adminRoute } from "./routes/admin/admin";
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
app.use("/api/booking", bookingRoute);
app.use("/api/admin", adminRoute);
export const db = Database.getInstance();

app.listen(5000, () => console.log("Server running on port 5000"));
