import { IUser } from "../types/common";

interface IUserToValidate {
  username: string;
  password: string;
  email: string;
  repeatedPassword: string;
}

export class User {
  public username: string;
  public password: string;
  public email: string;
  public type: string;
  public isTaken: boolean;
  public isValid;
  constructor(user: IUser) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.type = user.type;
  }
  public getUserProps(): IUserToValidate {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      repeatedPassword: this.password,
    };
  }
}
