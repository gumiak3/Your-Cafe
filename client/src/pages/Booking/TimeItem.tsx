import { useRef } from "react";

interface ITimeItem {
  handleTimePick: (time: string, index: number) => void;
  isBooked: boolean;
  time: {
    hour: number;
    minutes: number;
  };
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
  const hour = time.hour.toString().padStart(2, "0");
  const minutes = time.minutes.toString().padStart(2, "0");
  const timeToPrint = `${hour}:${minutes}`;

  return (
    <li className="list-none hover:bg-red">
      {isBooked ? (
        <button
          ref={btnRef}
          type="button"
          className="h-12 w-16 rounded-full shadow bg-gray-400 cursor-not-allowed"
        >
          {timeToPrint}
        </button>
      ) : (
        <button
          ref={btnRef}
          type="button"
          className={`h-12 w-16 rounded-full shadow hover:brightness-75 ${isSelected ? "bg-sky-400" : "bg-white"}`}
          onClick={() => handleTimePick(timeToPrint, index)}
        >
          {timeToPrint}
        </button>
      )}
    </li>
  );
}
