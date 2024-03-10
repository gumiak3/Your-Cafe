import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config({ path: ".env" });

// singleton dla klasy database connection

export const db = mysql
  .createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

console.log(process.env.DATABASE_HOST);
