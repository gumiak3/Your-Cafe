export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  type?: string;
}
export interface IValidateForm {
  [key: string]: validateStatus;
  email: validateStatus;
  password: validateStatus;
  username: validateStatus;
  repeatedPassword: validateStatus;
}
export enum validateStatus {
  correct = 1,
  emailTaken = "Email is already in use",
  passwordsAreNotMatched = "Passwords need to match",
  passwordInvalid = "Invalid Password",
  usernameInvalid = "Invalid username",
  emailInvalid = "Email does not match its requirements",
}
