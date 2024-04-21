import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ITimeSelector } from "../../types/common";
import TimeItem from "./TimeItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { useRef } from "react";

export default function TimeSelector({ openHours, closeHours }: ITimeSelector) {
  const sliderRef = useRef<HTMLUListElement>(null);
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

  function getTimeItems() {
    const nItems = closeHours.hour - openHours.hour;
    const items = [];
    for (let i = 0; i < nItems; i++) {
      items.push({ hour: openHours.hour + i, minutes: openHours.minutes });
    }
    return items;
  }

  return (
    <div className="flex items-center mt-4 gap-5">
      <button type="button" onClick={handleLeftArrow}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <ul ref={sliderRef} className="flex w-full overflow-hidden gap-3">
        {getTimeItems().map((item, index) => (
          <TimeItem
            key={index}
            time={{ hour: item.hour, minute: item.minutes }}
            type={item.hour <= 12 ? "am" : "pm"}
          />
        ))}
      </ul>
      <button type="button" onClick={handleRightArrow}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}
