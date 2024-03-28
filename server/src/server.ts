import express from "express";
import { router as authRoute } from "./routes/auth";
import { Database } from "./database";
import cors from "cors";
import session from "express-session";
const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/user", authRoute);

export const db = Database.getInstance();

app.listen(5000, () => console.log("Server running on port 5000"));
