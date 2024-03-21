import { IValidateForm, validateStatus } from "../../types/common";

export class registerValidator {
  private static email: validateStatus = validateStatus.emailInvalid;
  private static password: validateStatus = validateStatus.passwordInvalid;
  private static username: validateStatus = validateStatus.usernameInvalid;
  private static validateEmail(email: string): validateStatus {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return validateStatus.correct;
    }
    return validateStatus.emailInvalid;
  }
  private static validatePassword(
    password: string,
    repeatedPassword: string,
  ): validateStatus {
    if (password !== repeatedPassword) {
      return validateStatus.passwordsAreNotMatched;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(password)) {
      return validateStatus.correct;
    }
    return validateStatus.passwordInvalid;
  }
  private static validateUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9]{4,19}$/;
    if (usernameRegex.test(username)) {
      return validateStatus.correct;
    }
    return validateStatus.usernameInvalid;
  }
  public static validateForm(
    username: string,
    email: string,
    password: string,
    repeatedPassword: string,
  ): IValidateForm {
    this.email = this.validateEmail(email);
    this.password = this.validatePassword(password, repeatedPassword);
    this.username = this.validateUsername(username);
    return {
      email: this.email,
      password: this.password,
      username: this.username,
      repeatedPassword: this.password,
    };
  }
}
