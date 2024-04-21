import { ITimeItem } from "../../types/common";
import { useRef } from "react";

export default function TimeItem({ time, type }: ITimeItem) {
  const { hour, minute } = time;
  const btnRef = useRef<HTMLButtonElement>(null);
  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  function handleClick() {
    if (!btnRef.current) {
      return;
    }
    btnRef.current.classList.toggle("bg-sky-400");
    console.log(btnRef.current.classList);
  }
  return (
    <li className="list-none hover:bg-red">
      <button
        ref={btnRef}
        type="button"
        className="h-12 w-16 rounded-full bg-white shadow hover:brightness-75"
        onClick={handleClick}
      >
        {formattedTime}
      </button>
    </li>
  );
}
