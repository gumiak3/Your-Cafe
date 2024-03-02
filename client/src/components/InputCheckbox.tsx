
import {InputProps, InputType} from "../types/common";

export default function InputCheckbox({ id, label, type, name, ...rest }: InputProps) {
    return (
        <div className="flex gap-2 mb-4">
            <input
                id={id}
                name={name}
                type={type}
                className=""
                {...rest}
            />
            <label>{label}</label>
        </div>
    );
}
