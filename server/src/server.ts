import express, { Express, Request, Response } from "express";
import { router as authRoute } from "./routes/auth";
import { Database } from "./database";
const app = express();

app.use(express.json());

app.use("/api/user", authRoute);

const db = Database.getInstance();

async function users() {
  const users = await db.getUsers();
  console.log(users[1]);
}
users();

app.listen(5000, () => console.log("Server running on port 5000"));
