import { InputProps } from "../types/common";

export default function Input({ id, label, type, name, ...rest }: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        className="rounded px-2 py-1 mb-2"
        {...rest}
      />
    </div>
  );
}
