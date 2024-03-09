import { InputType } from "../../types/common";

export const inputs = [
  {
    type: InputType.TEXT,
    id: "username",
    name: "username",
    label: "Username",
    placeholder: "Username",
    required: true,
  },
  {
    type: InputType.EMAIL,
    id: "email",
    name: "email",
    label: "E-mail",
    placeholder: "E-mail",
    required: true,
  },
  {
    type: InputType.PASSWORD,
    id: "repeatPassword",
    name: "password",
    label: "Password",
    placeholder: "*********",
    required: true,
  },
  {
    type: InputType.PASSWORD,
    id: "password",
    name: "password",
    label: "Repeat Password",
    placeholder: "*********",
    required: true,
  },
];
