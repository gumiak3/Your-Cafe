import { forwardRef } from "react";
import { InputProps } from "../types/common";
type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>(
  ({ id, label, type, name, valid, ...rest }, ref) => {
    return (
      <div className="flex flex-col mb-4">
        {label ? <label htmlFor={name}>{label}</label> : null}
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          className="px-2 py-2 mb-2 border border-slate-300"
          {...rest}
        />
        {!valid ? <p className="text-red-500 text-sm">Invalid input</p> : null}
      </div>
    );
  },
);
