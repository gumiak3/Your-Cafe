import { IUser } from "../../types/common";

export class User {
  public username: string;
  public password: string;
  public email: string;
  public type: string;
  public id: number;
  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.type = user.type;
  }
}
