import { ButtonProps } from "../types/common";
export default function Button({
  type,
  handleClick,
  extraStyles,
  children,
}: ButtonProps) {
  return (
    <button
      className={"bg-orange-500 w-full p-3 text-white uppercase " + extraStyles}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}
