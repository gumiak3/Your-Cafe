import { ITimeSelector } from "../../types/common";
import TimeItem from "./TimeItem";

export default function TimeSelector({ openHours, closeHours }: ITimeSelector) {
  function handleRightArrow() {}
  function handleLeftArrow() {}
  function getTimeItems() {
    const nItems = closeHours.hour - openHours.hour;
    const items = [];
    for (let i = 0; i < nItems; i++) {
      items.push({ hour: openHours.hour + i, minutes: openHours.minutes });
    }
    return items;
  }
  return (
    <div>
      {getTimeItems().map((item, index) => (
        <TimeItem
          key={index}
          time={{ hour: item.hour, minute: item.minutes }}
          type={item.hour <= 12 ? "am" : "pm"}
        />
      ))}
    </div>
  );
}
