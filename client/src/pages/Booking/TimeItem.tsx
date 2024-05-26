import { useRef } from "react";

interface ITimeItem {
  handleTimePick: (time: string, index: number) => void;
  isBooked: boolean;
  time: string;
  index: number;
  isSelected: boolean;
}

export default function TimeItem({
  handleTimePick,
  isBooked,
  time,
  index,
  isSelected,
}: ITimeItem) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <li className="list-none hover:bg-red">
      {isBooked ? (
        <button
          ref={btnRef}
          type="button"
          className="h-12 w-16 rounded-full shadow bg-gray-400 cursor-not-allowed"
        >
          {time}
        </button>
      ) : (
        <button
          ref={btnRef}
          type="button"
          className={`h-12 w-16 rounded-full shadow hover:brightness-75 ${isSelected ? "bg-sky-400" : "bg-white"}`}
          onClick={() => handleTimePick(time, index)}
        >
          {time}
        </button>
      )}
    </li>
  );
}
