import { validateStatus } from "../../../client/src/types/common";
export class Validator {
  public validateEmail(email: string): validateStatus {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return validateStatus.correct;
    }
    return validateStatus.emailInvalid;
  }
  public validateDateFormat(data: string) {
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (dateRegex.test(data)) {
      return validateStatus.correct;
    }
    return validateStatus.dateInvalidFormat;
  }
  public validateGuestsNumber(guests: number) {
    return guests > 0 && guests <= 10
      ? validateStatus.correct
      : validateStatus.numberOfGuestsInvalid;
  }
}
