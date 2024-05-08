import { IValidateForm, validateStatus } from "../types/common";

export class FormValidator {
  public email: validateStatus = validateStatus.emailInvalid;
  public password: validateStatus = validateStatus.passwordInvalid;
  public username: validateStatus = validateStatus.usernameInvalid;
  public validateEmail(email: string): validateStatus {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return validateStatus.correct;
    }
    return validateStatus.emailInvalid;
  }
  public validateUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9]{4,19}$/;
    if (usernameRegex.test(username)) {
      return validateStatus.correct;
    }
    return validateStatus.usernameInvalid;
  }
}
