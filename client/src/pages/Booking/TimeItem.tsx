import { ITimeItem } from "../../types/common";

export default function TimeItem({ time, type }: ITimeItem) {
  const { hour, minute } = time;
  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${type}`;
  return <li>{formattedTime}</li>;
}
