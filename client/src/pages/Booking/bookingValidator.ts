import { FormValidator } from "../../utils/validator";
import { IValidateForm, validateStatus } from "../../types/common";
import { validatedBookingForm } from "./Booking";

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
    return validateStatus.numberOfGuests;
  }
  public validateForm(
    email: string,
    username: string,
    phoneNumber: string,
    numberOfGuests: number,
    time: string,
  ): validatedBookingForm {
    return {
      email: this.validateEmail(email),
      username: this.validateName(username),
      phoneNumber: this.validatePhoneNumber(phoneNumber),
      numberOfGuests: this.validateNumberOfGuests(numberOfGuests),
      time: this.validateTime(time),
    };
  }
}
