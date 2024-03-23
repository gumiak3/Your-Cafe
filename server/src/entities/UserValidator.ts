import { IValidateForm, validateStatus } from "../types/common";

export class UserValidator {
  public email: validateStatus = validateStatus.emailInvalid;
  private password: validateStatus = validateStatus.passwordInvalid;
  private username: validateStatus = validateStatus.usernameInvalid;
  private validateEmail(email: string): validateStatus {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return validateStatus.correct;
    }
    return validateStatus.emailInvalid;
  }
  private validatePassword(
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
  private validateUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9]{4,19}$/;
    if (usernameRegex.test(username)) {
      return validateStatus.correct;
    }
    return validateStatus.usernameInvalid;
  }
  public emailIsTaken() {
    this.email = validateStatus.emailTaken;
    return this.email;
  }
  public getValids(): IValidateForm {
    return {
      email: this.email,
      password: this.password,
      username: this.username,
      repeatedPassword: this.password,
    };
  }
  public validate(
    username: string,
    email: string,
    password: string,
    repeatedPassword: string,
  ): IValidateForm {
    this.email = this.validateEmail(email);
    this.password = this.validatePassword(password, repeatedPassword);
    this.username = this.validateUsername(username);
    return this.getValids();
  }
}
