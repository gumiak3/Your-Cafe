import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ListElementProps {
  href: string;
  content: string;
  icon?: IconDefinition;
  hoverSneakPeek: boolean;
}
export interface VerticalListElementProps {
  href: string;
  content: string;
  onClick?: () => void;
}

export interface InputProps {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  valid?: validateStatus;
  extraStyles?: string;
}

// register
export interface RegisterFormProps {
  email: string;
  password: string;
  repeatedPassword: string;
  username: string;
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
  noUserFound = "There is no such user",
  phoneNumberInvalid = "Phone number does not match its requirements",
  numberOfGuests = "Invalid number of guests",
  timeNotSelected = "You need to select a time",
  timeInvalid = "Invalid Time",
}

// end of register

// login
export interface IValiidateLoginForm {
  [key: string]: validateStatus;
  email: validateStatus;
  password: validateStatus;
}
// end of login

export enum InputType {
  CHECKBOX = "checkbox",
  EMAIL = "email",
  NUMBER = "number",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  TEXT = "text",
  TEL = "tel",
}

export enum ButtonType {
  SUBMIT = "submit",
  BUTTON = "button",
}

export interface ButtonProps {
  type: ButtonType;
  extraStyles?: string;
  handleClick?: (e: any) => void;
  children?: React.ReactNode;
}

export interface IUserState {
  username: string;
  access: string;
}
