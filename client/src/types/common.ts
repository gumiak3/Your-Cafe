import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ListElementProps {
  href: string;
  content: string;
  icon?: IconDefinition;
  hoverSneakPeek: boolean;
}

export interface InputProps {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  valid?: boolean;
}

// register
export interface RegisterFormProps {
  email: string;
  password: string;
  repeatedPassword: string;
  username: string;
}
export interface IValiidateForm {
  [key: string]: boolean;
  email: boolean;
  password: boolean;
  username: boolean;
}

// end of register

export enum InputType {
  CHECKBOX = "checkbox",
  EMAIL = "email",
  NUMBER = "number",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  TEXT = "text",
}

export enum ButtonType {
  SUBMIT = "submit",
  BUTTON = "button",
}

export interface ButtonProps {
  type: ButtonType;
  text: string;
  handleClick?: (e: any) => void;
}
