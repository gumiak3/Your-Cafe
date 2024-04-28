import { IBookingHours, IReservations } from "../types/common";

type IHours = {
  hour: number;
  minutes: number;
};

export class BookingController {
  constructor() {}

  public convertWeekDayToString(day: number): string | null {
    if (day < 0 || day > 11) return null;
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[day];
  }
  private getBookedHours(dailyReservations: IReservations[]): IHours[] {
    const bookedHours = [];
    dailyReservations.forEach((item) => {
      const reservationTime = this.convertIntoInterface(item.reservation_time);
      bookedHours.push(reservationTime);
    });
    return bookedHours;
  }
  public getBookingTimeStamps(
    bookingHours: IBookingHours,
    dailyReservations: IReservations[],
  ) {
    const openHours = this.convertIntoInterface(bookingHours.opening_time);
    const closeHours = this.convertIntoInterface(bookingHours.closing_time);

    const bookedHours = this.getBookedHours(dailyReservations);

    return this.calcBookingTimeStamps(openHours, closeHours, bookedHours);
  }
  private calcBookingTimeStamps(
    openHours: IHours,
    closeHours: IHours,
    bookedHours: IHours[],
  ): { time: { hour: number; minutes: number }; isBooked: boolean }[] {
    const nItems = closeHours.hour - openHours.hour;
    const items = [];
    for (let i = 0; i < nItems; i++) {
      let isBooked = false;
      const time = { hour: openHours.hour + i, minutes: openHours.minutes };
      bookedHours.forEach((bookedHour) => {
        if (bookedHour.hour === time.hour) {
          isBooked = true;
        }
      });
      items.push({
        time: { hour: openHours.hour + i, minutes: openHours.minutes },
        isBooked: isBooked,
      });
    }
    return items;
  }

  private convertIntoInterface(time: string) {
    return {
      hour: Number(time?.slice(0, 2)),
      minutes: Number(time?.slice(3, 4)),
    };
  }
}
