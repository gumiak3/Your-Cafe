import { RegisterFormProps, IValiidateForm } from "../../types/common";
export abstract class registerValidator {
  private static email: boolean = false;
  private static password: boolean = false;
  private static username: boolean = false;
  constructor() {}
  private static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  private static validatePassword(password: string, repeatedPassword: string) {
    if (password !== repeatedPassword) {
      return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }
  private static validateUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9]{4,19}$/;
    return usernameRegex.test(username);
  }
  public static validateForm(
    username: string,
    email: string,
    password: string,
    repeatedPassword: string,
  ): IValiidateForm {
    this.email = this.validateEmail(email);
    this.password = this.validatePassword(password, repeatedPassword);
    this.username = this.validateUsername(username);
    return {
      email: this.email,
      password: this.password,
      username: this.username,
    };
  }
}
