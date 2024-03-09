import express, { Express, Request, Response } from "express";
import { router as authRoute } from "./routes/auth";
const app = express();

app.use(express.json());

app.use("/api/user", authRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
