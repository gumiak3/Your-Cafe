import { IUser } from "../types/common";

export class User {
  public username: string;
  public password: string;
  public email: string;
  public type: string;
  constructor(user: IUser) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.type = user.type;
  }
}
