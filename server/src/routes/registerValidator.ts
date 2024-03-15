interface IUser {
  username: string;
  password: string;
  email: string;
}
export class RegisterValidator {
  private email: boolean = false;
  private password: boolean = false;
  private username: boolean = false;
  constructor() {}
  private validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.email = emailRegex.test(email);
  }
  private validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    this.password = passwordRegex.test(password);
  }
  private validateUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9]{4,19}$/;
    this.username = usernameRegex.test(username);
  }
  public validateUser(user: IUser) {
    this.validateEmail(user.email);
    this.validateUsername(user.username);
    this.validatePassword(user.password);
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }
}
