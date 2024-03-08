import express, { Express, Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
