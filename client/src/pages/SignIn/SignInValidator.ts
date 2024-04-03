import {
  IValidateForm,
  IValiidateLoginForm,
  validateStatus,
} from "../../types/common";

export class SignInValidator {
  private static validateEmail(email: string): validateStatus {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return validateStatus.correct;
    }
    return validateStatus.emailInvalid;
  }
  private static validatePassword(password: string): validateStatus {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(password)) {
      return validateStatus.correct;
    }
    return validateStatus.passwordInvalid;
  }
  public static validateForm(
    email: string,
    password: string,
  ): IValiidateLoginForm {
    return {
      email: this.validateEmail(email),
      password: this.validatePassword(password),
    };
  }
}
