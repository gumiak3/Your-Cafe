import { IValidateForm, validateStatus } from "../../types/common";
import { FormValidator } from "../../utils/validator";

export class RegisterValidator extends FormValidator {
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

  public validateForm(
    username: string,
    email: string,
    password: string,
    repeatedPassword: string,
  ): IValidateForm {
    const validatedPassword = this.validatePassword(password, repeatedPassword);
    return {
      email: this.validateEmail(email),
      password: validatedPassword,
      username: this.validateUsername(username),
      repeatedPassword: validatedPassword,
    };
  }
}
