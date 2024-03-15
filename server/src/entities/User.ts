import { IUser } from "../types/common";

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
  public getUserProps(): IUser {
    return {
      username: this.username,
      password: this.password,
      email: this.email,
      type: this.type,
    };
  }
}
