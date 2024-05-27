import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
export function SuccessBook() {
  return (
    <div className="flex items-center justify-center shadow-around max-w-96 m-auto relativeshadow-2xl bg-white bg-opacity-70 p-6 rounded">
      <div className="p-2 bg-lime-400 rounded-full">
        <FontAwesomeIcon
          className={"text-3xl text-white px-2 py-1"}
          icon={faCheck}
        />
      </div>
      <p className="px-4 font-bold">Successfully booked!</p>
    </div>
  );
}
