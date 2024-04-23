import { guestInputs } from "./Booking.data";
import { Input } from "../../components/Input";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  ButtonType,
  InputType,
  ITimeSelector,
  IUserState,
} from "../../types/common";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TimeSelector from "./TimeSelector";
import { useBookingHours } from "../../hooks/useBookingHours";
import { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import Button from "../../components/Button";

export default function Booking() {
  const isAuth = useIsAuthenticated();
  const user: IUserState | null = useAuthUser();
  const openHours = useBookingHours();
  const [weekDayOpenHours, setWeekDayOpenHours] = useState<ITimeSelector>();
  const dateRef = useRef(null);
  useEffect(() => {
    if (weekDayOpenHours === undefined) {
      const weekDay = convertWeekDayToString(new Date().getDay());
      if (!weekDay) {
        return;
      }

      setWeekDayOpenHours(getWeekDayData(weekDay));
    }
  }, [openHours]);

  function handleClick(e: any) {
    e.preventDefault();
  }

  function bookingForm() {
    if (isAuth) {
      return <div>Welcome {user?.username}</div>;
    } else {
      return guestInputs.map((element, index) => (
        <Input {...element} key={index} />
      ));
    }
  }
  function convertWeekDayToString(day: number): string | null {
    if (day < 0 || day > 11) return null;
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[day];
  }
  function getWeekDayData(weekDay: string) {
    return openHours.filter((item) => item.weekDay === weekDay)[0];
  }
  function handleDateChange(e: any) {
    const weekDay = convertWeekDayToString(e.$W);
    if (!weekDay) {
      return;
    }
    setWeekDayOpenHours(getWeekDayData(weekDay));
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="background-image-w min-h-screen">
        <section className="shadow-around max-w-lg m-auto relativeshadow-2xl bg-white bg-opacity-70 p-6 rounded">
          <h1 className="text-3xl text-center">Book a table</h1>
          <form className="p-12 flex flex-col">
            {bookingForm()}
            <DatePicker
              ref={dateRef}
              onChange={(e) => handleDateChange(e)}
              disablePast
              label="Date"
              defaultValue={dayjs(new Date())}
              slotProps={{
                textField: {
                  sx: {
                    color: "#ad1457",
                    borderRadius: "1px",
                    borderWidth: "0px",
                    borderColor: "#e91e63",
                    border: "0px solid",
                    backgroundColor: "white",
                  },
                },
              }}
            />
            {weekDayOpenHours ? (
              <TimeSelector
                weekDay={weekDayOpenHours.weekDay}
                openHours={weekDayOpenHours.openHours}
                closeHours={weekDayOpenHours.closeHours}
              />
            ) : (
              <div className="w-full flex justify-center mt-4">
                <CircularProgress color="inherit" />
              </div>
            )}
            <Input
              name="extra-information"
              id="extra-information"
              type={InputType.TEXTAREA}
              label={"Extra information"}
            />
            <Button
              type={ButtonType.SUBMIT}
              handleClick={(e) => handleClick(e)}
            >
              Book a table
            </Button>
          </form>
        </section>
      </div>
    </LocalizationProvider>
  );
}

/* Because of the structure of the DesktopDatePicker, the `sx` prop needs to be applied to
the `layout` slot */
