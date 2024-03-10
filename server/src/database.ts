import dotenv from "dotenv";
import mysql from "mysql2";
import { create } from "domain";

dotenv.config({ path: ".env" });

// singleton dla klasy database connection
export class Database {
  private static instance: Database;
  private connection;

  private constructor() {
    this.connection = this.createConnection();
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new Database();
    }
    return this.instance;
  }

  private createConnection() {
    const connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    });
    connection.connect((err) => {
      if (err) {
        throw new Error(`Database connection error ${err}`);
      } else {
        console.log(`Connected to database ${process.env.DATABASE}`);
      }
    });
    return connection.promise();
  }
  public async getUsers(): Promise<Object> {
    try {
      const query = await this.connection.query("Select * from Users");
      return query;
    } catch (err) {
      console.error("xd");
    }
  }
}
