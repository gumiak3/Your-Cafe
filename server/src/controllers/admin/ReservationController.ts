import { Validator } from "../../entities/Validator";
import { db } from "../../server";
import { validateStatus } from "../../../../client/src/types/common";
import { BookingController, timeStamp } from "../booking/BookingController";

export type updateReservationParams = {
  userId: number;
  numberOfPeople: number;
  extraInformation: string;
  reservationDate: string;
  reservationTime: string;
  status: string;
  reservationId: number;
};
export class ReservationController extends Validator {
  constructor() {
    super();
  }

  public async validateUser(userId: number) {
    const user = await db.getUserById(userId);
    return user && validateStatus.correct;
  }
  private validateStatus(status: string) {
    const possibleStatus = ["waiting", "confirmed", "cancelled", "finished"];
    return possibleStatus.includes(status.toLowerCase())
      ? validateStatus.correct
      : validateStatus.invalidStatus;
  }
  public async validateSelectedTime(
    time: string,
    date: string,
    reservationId: number,
  ) {
    if (time === "") return;
    const bookingController = new BookingController();
    const convertedSelectedTime = bookingController.convertIntoInterface(time);
    const weekDay = bookingController.convertWeekDayToString(
      new Date(date).getDay(),
    );
    try {
      const dbOpeningHours = await db.getOpeningHours(weekDay);
      const dbDailyReservations = await db.getDailyReservations(date);

      // do not compare reservation with the same id
      const filteredDailyReservation = dbDailyReservations.filter(
        (reservation) => reservation.reservation_id !== reservationId,
      );

      const timeStamps: timeStamp[] = bookingController.getBookingTimeStamps(
        dbOpeningHours,
        filteredDailyReservation,
      );

      const freeTimeStamps = timeStamps.filter(
        (timeStamp) => timeStamp.isBooked === false,
      );
      const isValid =
        freeTimeStamps.filter((timeStamp) => timeStamp.time === time).length ===
        1;

      return isValid ? validateStatus.correct : validateStatus.timeInvalid;
    } catch (error) {
      return validateStatus.timeInvalid;
    }
  }
  public async updateReservation(params: updateReservationParams) {
    return await db.updateReservation(params);
  }
  public async validateUpdatingReservationParams(
    params: updateReservationParams,
  ) {
    return {
      date: this.validateDateFormat(params.reservationDate),
      userId: await this.validateUser(params.userId),
      numberOfPeople: this.validateGuestsNumber(params.numberOfPeople),
      reservationDate: this.validateDateFormat(params.reservationDate),
      reservationTime: await this.validateSelectedTime(
        params.reservationTime,
        params.reservationDate,
        params.reservationId,
      ),
      status: this.validateStatus(params.status),
    };
  }
}
