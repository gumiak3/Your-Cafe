import {InputProps, InputType} from "../types/common";

export default function Input({ id, label, type, name, ...rest }: InputProps) {
  return (
    <div className="flex flex-col mb-4">
        {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        id={id}
        name={name}
        type={type}
        className="px-2 py-2 mb-2 border border-slate-300"
        {...rest}
      />
    </div>
  );
}
