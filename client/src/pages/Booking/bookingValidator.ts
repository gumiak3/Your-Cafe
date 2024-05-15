import { FormValidator } from "../../utils/validator";
import { validateStatus } from "../../types/common";
import { validatedGuestBookingForm, validatedUserBookingForm } from "./Booking";

export class BookingValidator extends FormValidator {
  private validatePhoneNumber(phoneNumber: string) {
    const phoneNumberRegex = /^\d{9}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      return validateStatus.correct;
    }
    return validateStatus.phoneNumberInvalid;
  }
  private validateTime(time: string) {
    return time !== ""
      ? validateStatus.correct
      : validateStatus.timeNotSelected;
  }
  private validateName(name: string) {
    return name !== ""
      ? validateStatus.correct
      : validateStatus.usernameInvalid;
  }
  private validateNumberOfGuests(guests: number) {
    if (guests > 0 && guests <= 10) {
      return validateStatus.correct;
    }
    return validateStatus.numberOfGuestsInvalid;
  }
  public validateUserForm(
    phoneNumber: string,
    numberOfGuests: number,
    time: string,
  ): validatedUserBookingForm {
    return {
      phoneNumber: this.validatePhoneNumber(phoneNumber),
      numberOfGuests: this.validateNumberOfGuests(numberOfGuests),
      time: this.validateTime(time),
    };
  }
  public validateGuestForm(
    email: string,
    username: string,
    phoneNumber: string,
    numberOfGuests: number,
    time: string,
  ): validatedGuestBookingForm {
    return {
      email: this.validateEmail(email),
      username: this.validateName(username),
      phoneNumber: this.validatePhoneNumber(phoneNumber),
      numberOfGuests: this.validateNumberOfGuests(numberOfGuests),
      time: this.validateTime(time),
    };
  }
}
