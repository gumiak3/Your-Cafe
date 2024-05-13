import { Validator } from "../Validator";
import { validateStatus } from "../../../../client/src/types/common";
import { db } from "../../server";
import {
  BookingController,
  timeStamp,
} from "../../controllers/booking/BookingController";

export type validBookTableParams = {
  data: validateStatus;
  email: validateStatus;
  phoneNumber: validateStatus;
  time: validateStatus;
  username: validateStatus;
};
export class BookTableValidator extends Validator {
  private validatePhoneNumber(phoneNumber: string) {
    const phoneNumberRegex = /^\d{9}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      return validateStatus.correct;
    }
    return validateStatus.phoneNumberInvalid;
  }
  private validateDateFormat(data: string) {
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (dateRegex.test(data)) {
      return validateStatus.correct;
    }
    return validateStatus.dateInvalidFormat;
  }
  private async validateSelectedTime(time: string, date: string) {
    if (time === "") return;
    const bookingController = new BookingController();
    const convertedSelectedTime = bookingController.convertIntoInterface(time);
    const weekDay = bookingController.convertWeekDayToString(
      new Date(date).getDay(),
    );
    try {
      const dbOpeningHours = await db.getOpeningHours(weekDay);
      const dbDailyReservations = await db.getDailyReservations(date);

      const timeStamps: timeStamp[] = bookingController.getBookingTimeStamps(
        dbOpeningHours,
        dbDailyReservations,
      );
      const freeTimeStamps = timeStamps.filter(
        (timeStamp) => timeStamp.isBooked === false,
      );
      const isValid =
        freeTimeStamps.filter(
          (timeStamp) =>
            timeStamp.time.hour === convertedSelectedTime.hour &&
            timeStamp.time.minutes === convertedSelectedTime.minutes,
        ).length === 1;

      return isValid ? validateStatus.correct : validateStatus.timeInvalid;
    } catch (error) {
      return validateStatus.timeInvalid;
    }
  }
  private validateName(name: string) {
    if (name.length > 0) return validateStatus.correct;
    return validateStatus.usernameInvalid;
  }
  private validateGuestsNumber(guests: number) {
    return guests > 0 && guests <= 10
      ? validateStatus.correct
      : validateStatus.numberOfGuestsInvalid;
  }
  public async validateRequestParams(
    date: string,
    email: string,
    phoneNumber: string,
    time: string,
    username: string,
    numberOfGuests: number,
  ) {
    return {
      data: this.validateDateFormat(date),
      email: this.validateEmail(email),
      phoneNumber: this.validatePhoneNumber(phoneNumber),
      time: await this.validateSelectedTime(time, date),
      username: this.validateName(username),
      numberOfGuests: this.validateGuestsNumber(numberOfGuests),
    };
  }
}
