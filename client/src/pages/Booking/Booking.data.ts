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
    name: "username",
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
    name: "phoneNumber",
    label: "Phone number",
    placeholder: "000000000",
    required: true,
  },
  {
    type: InputType.NUMBER,
    id: "number-of-guests",
    name: "numberOfGuests",
    label: "Number of guests",
    placeholder: "Number of guests",
    required: true,
    min: 1,
    max: 10,
  },
];
