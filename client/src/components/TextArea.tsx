import { forwardRef } from "react";
import { InputProps, validateStatus } from "../types/common";

type Ref = HTMLTextAreaElement;

export const TextArea = forwardRef<Ref, InputProps>(
  ({ id, label, type, name, valid, extraStyles, ...rest }, ref) => {
    return (
      <div className="flex flex-col mb-4">
        {label ? <label htmlFor={name}>{label}</label> : null}
        <textarea
          id={id}
          name={name}
          className={`px-2 py-2 mb-2 border border-slate-300 ${extraStyles}`}
          {...rest}
          ref={ref}
        />
        {valid && valid !== validateStatus.correct ? (
          <p className="text-red-500">{valid}</p>
        ) : null}
      </div>
    );
  },
);
