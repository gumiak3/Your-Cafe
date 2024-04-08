import { InputType } from "../../types/common";

export const loggedInInputs = [
  {
    type: InputType.TEXT,
    id: "username",
    name: "username",
    label: "Username",
    placeholder: "Username",
    required: true,
  },
];

export const guestInputs = [
  {
    type: InputType.TEXT,
    id: "name",
    name: "name",
    label: "Name",
    placeholder: "Name",
    required: true,
  },
  {
    type: InputType.EMAIL,
    id: "email",
    name: "email",
    label: "Email",
    placeholder: "Email",
    required: true,
  },
  {
    type: InputType.TEL,
    id: "phone-number",
    name: "phone-number",
    label: "Phone number",
    placeholder: "000000000",
    required: true,
  },
];
