import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { useRef, useState } from "react";
import TimeItem from "./TimeItem";

interface ITimeSelector {
  date: string;
  timeStamps: {
    isBooked: boolean;
    time: {
      hour: number;
      minutes: number;
    };
  }[];
  handleTimeSelect: (time: string) => void;
}
export default function TimeSelector({
  date,
  timeStamps,
  handleTimeSelect,
}: ITimeSelector) {
  const sliderRef = useRef<HTMLUListElement>(null);
  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    index: number;
  }>();
  function handleRightArrow() {
    if (!sliderRef.current) {
      return;
    }
    sliderRef.current.style.scrollBehavior = "smooth";
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  }

  function handleLeftArrow() {
    if (!sliderRef.current) {
      return;
    }
    sliderRef.current.style.scrollBehavior = "smooth";
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  }
  function handleTimePick(time: string, index: number) {
    console.log(`you picked ${time}`);
    setSelectedTime({ time: time, index: index });
    handleTimeSelect(time);
  }

  return (
    <div className="flex items-center mt-4 gap-5">
      <button type="button" onClick={handleLeftArrow}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <ul ref={sliderRef} className="flex w-full overflow-hidden gap-3">
        {timeStamps.map((item, index) => {
          return (
            <TimeItem
              isSelected={selectedTime?.index === index}
              handleTimePick={handleTimePick}
              key={`timeStamp-${index}`}
              time={item.time}
              isBooked={item.isBooked}
              index={index}
            />
          );
        })}
      </ul>
      <button type="button" onClick={handleRightArrow}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}
