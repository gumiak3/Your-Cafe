import dotenv from "dotenv";
import mysql from "mysql2";
import { DatabaseUser, IUser } from "./types/common";
import {
  IBookingHours,
  IReservations,
} from "./controllers/booking/BookingController";
import { reservation, reservationRequest } from "./routes/bookingTable";

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
      throw new Error("Something went wrong with selecting from database");
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
      return this.parseUser(result[0]);
    } catch (err) {
      throw new Error("something went wrong with getting data from database");
    }
  }
  public async getUserById(id: number) {
    try {
      const query = `SELECT * FROM Users WHERE user_id = ?`;
      const [result] = await this.connection.query(query, id);

      return this.parseUser(result[0]);
    } catch (err) {
      throw new Error("User not found in database");
    }
  }
  private async getUserId(email: string) {
    try {
      const query = `SELECT user_id FROM Users WHERE email = ?`;
      const [result] = await this.connection.query(query, email);
      return result[0].user_id;
    } catch (err) {
      throw new Error("something went wrong with getting data from database");
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
      throw new Error("Couldn't fetch a opening hours from database");
    }
  }
  public async getDailyReservations(date: string): Promise<IReservations[]> {
    try {
      const query = `SELECT * FROM Reservations WHERE reservation_date = ?`;
      const [result] = await this.connection.query(query, date);
      return result;
    } catch (err) {
      throw new Error("Couldn't fetch a opening hours from database");
    }
  }
  public async insertReservation(reservationData: reservation) {
    try {
      const query = `INSERT INTO Reservations (user_id,number_of_people,extra_information,status,reservation_time,reservation_date) VALUES (?,?,?,?,?,?)`;
      const userId: number = await this.getUserId(reservationData.user.email);
      const [result] = await this.connection.query(query, [
        userId,
        reservationData.numberOfGuests,
        reservationData.extraInfo,
        reservationData.status,
        reservationData.time,
        reservationData.date,
      ]);
      return true;
    } catch (err) {
      throw new Error("Couldn't insert a new reservation to database");
      return false;
    }
  }
  public async getReservations(offset: number, limit: number) {
    try {
      const query =
        "SELECT * FROM Reservations ORDER BY reservation_date LIMIT ? OFFSET ?";
      const [result] = await this.connection.query(query, [limit, offset]);
      return result;
    } catch (err) {
      throw new Error(`Couldn't fetch reservations from database`);
    }
  }
}
