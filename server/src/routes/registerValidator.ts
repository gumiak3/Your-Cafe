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
  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  private validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }
  private validateUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9]{4,19}$/;
    return usernameRegex.test(username);
  }
  public validateUser(user: IUser) {
    return (
      this.validateUsername(user.username) &&
      this.validateEmail(user.email) &&
      this.validatePassword(user.password)
    );
  }
}
