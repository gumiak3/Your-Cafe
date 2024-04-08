import Button from "../Button";
import { ButtonType } from "../../types/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { months } from "./Months.data";
import { useState } from "react";
export default function TermMonths() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  function handleLeftArrow() {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    setCurrentMonth(newMonth);
  }
  function handleRightArrow() {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    setCurrentMonth(newMonth);
  }
  return (
    <section className="flex bg-orange-500 items-center">
      <Button type={ButtonType.BUTTON} handleClick={handleLeftArrow}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <div className="w-80 text-center">{months[currentMonth]}</div>
      <Button type={ButtonType.BUTTON} handleClick={handleRightArrow}>
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </section>
  );
}
