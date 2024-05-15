import { IValiidateLoginForm, validateStatus } from "../../types/common";
import { FormValidator } from "../../utils/validator";

export class SignInValidator extends FormValidator {
  private validatePassword(password: string): validateStatus {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(password)) {
      return validateStatus.correct;
    }
    return validateStatus.passwordInvalid;
  }
  public validateForm(email: string, password: string): IValiidateLoginForm {
    return {
      email: this.validateEmail(email),
      password: this.validatePassword(password),
    };
  }
}
