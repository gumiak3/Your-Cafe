import { Validator } from "./Validator";
import { validateStatus } from "../../../client/src/types/common";
import { db } from "../server";
import { BookingController, timeStamp } from "./BookingController";
export class BookTableValidator extends Validator {
  private validatePhoneNumber(phoneNumber: string) {
    const phoneNumberRegex = /^\d{9}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      return validateStatus.correct;
    }
    return validateStatus.phoneNumberInvalid;
  }
  private async validateSelectedTime(time: string, date: string) {
    if (time === "") return;
    const bookingController = new BookingController();
    const convertedSelectedTime = bookingController.convertIntoInterface(time);
    const weekDay = bookingController.convertWeekDayToString(
      new Date(date).getDay(),
    );
    const dbOpeningHours = await db.getOpeningHours(weekDay);
    const dbDailyReservations = await db.getDailyReservations(date);

    const timeStamps: timeStamp[] = bookingController.getBookingTimeStamps(
      dbOpeningHours,
      dbDailyReservations,
    );
    const freeTimeStamps = timeStamps.filter(
      (timeStamp) => timeStamp.isBooked === true,
    );
    const isValid =
      freeTimeStamps.filter(
        (timeStamp) =>
          timeStamp.time.hour === convertedSelectedTime.hour &&
          timeStamp.time.minutes === convertedSelectedTime.minutes,
      ).length === 1;
    return !isValid ? validateStatus.timeInvalid : validateStatus.correct;
  }
  public validateRequestParams(
    data: string,
    email: string,
    phoneNumber: string,
    time: string,
    username: string,
  ) {}
}
