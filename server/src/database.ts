import dotenv from "dotenv";
import mysql from "mysql2";
import { DatabaseUser, IUser } from "./types/common";
import {
  IBookingHours,
  IReservations,
} from "./controllers/booking/BookingController";
import { reservationRequest } from "./routes/bookingTable";

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
        console.error(err);
      } else {
        console.log(`Connected to database ${process.env.DATABASE}`);
      }
    });
    return connection.promise();
  }
  public async isEmailTaken(email: string): Promise<boolean> {
    try {
      const query = `SELECT count(*) as counted FROM Users WHERE email = ?`;
      const [result] = await this.connection.query(query, email);
      return result[0].counted > 0;
    } catch (err) {
      console.error("Something went wrong with selecting from database");
    }
  }
  public async insertUser(user: IUser): Promise<boolean> {
    try {
      const query = `INSERT INTO Users (email, username, password_hash, type) VALUES (?,?,?, ?)`;
      const [result] = await this.connection.query(query, [
        user.email,
        user.username,
        user.password,
        user.type,
      ]);
      console.log("Successfully added a user to database");
      return true;
    } catch (err) {
      console.error("something went wrong with inserting data to database");
      return false;
    }
  }
  public async getUser(email: string) {
    try {
      const query = `SELECT * FROM Users WHERE email = ?`;
      const [result] = await this.connection.query(query, email);
      console.log("Successfully fetch user from db");
      return this.parseUser(result[0]);
    } catch (err) {
      console.error("something went wrong with getting data from database");
    }
  }

  private parseUser(dbUser: DatabaseUser): IUser {
    return {
      id: dbUser.user_id,
      username: dbUser.username,
      email: dbUser.email,
      password: dbUser.password_hash,
      type: dbUser.type,
    };
  }

  public async getOpeningHours(weekDay: string): Promise<IBookingHours> {
    try {
      const query = `SELECT day_of_the_week, TIME_FORMAT(opening_time, '%H:%i') as opening_time, TIME_FORMAT(closing_time, '%H:%i') as closing_time FROM Restaurant_open_hours WHERE day_of_the_week = ?`;
      const [result] = await this.connection.query(query, weekDay);
      console.log(`Successfully fetch opening hours from db`);
      return result[0];
    } catch (err) {
      console.error("Couldn't fetch a opening hours from database");
    }
  }
  public async getDailyReservations(date: string): Promise<IReservations[]> {
    try {
      const query = `SELECT * FROM Reservations WHERE reservation_date = ?`;
      const [result] = await this.connection.query(query, date);
      console.log(`Successfully fetch opening hours from db`);
      return result;
    } catch (err) {
      console.error("Couldn't fetch a opening hours from database");
    }
  }
  public async insertReservation(reservationData: reservationRequest) {
    try {
      const query = `INSERT INTO Reservations (user_id,number_of_people,extra_information,status,reservation_time,reservation_date,email) VALUES (?,?,?,?,?,?,?)`;
      const [result] = await this.connection.query(query, [
        1,
        1,
        reservationData.extraInfo,
        "waiting for accept",
        reservationData.time,
        reservationData.date,
        reservationData.email,
      ]);
      console.log("Successfully inserted new reservation to database");
      return true;
    } catch (err) {
      console.error("Couldn't insert a new reservation to database");
      return false;
    }
  }
}
