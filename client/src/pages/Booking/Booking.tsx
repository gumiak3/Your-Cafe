import { guestInputs } from "./Booking.data";
import { Input } from "../../components/Input";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  ButtonType,
  InputType,
  IUserState,
  validateStatus,
} from "../../types/common";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TimeSelector from "./TimeSelector";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { CircularProgress } from "@mui/material";
import { BookingValidator } from "./bookingValidator";
import { Simulate } from "react-dom/test-utils";

interface IBookingHours {
  date: string;
  timeStamps: {
    isBooked: boolean;
    time: {
      hour: number;
      minutes: number;
    };
  }[];
}
export type validatedBookingForm = {
  [key: string]: validateStatus;
  email: validateStatus;
  username: validateStatus;
  phoneNumber: validateStatus;
  numberOfGuests: validateStatus;
  time: validateStatus;
};

type bookTableType = {
  username: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  user: boolean;
  extraInfo: string;
  numberOfGuests: number;
};

export default function Booking() {
  const isAuth = useIsAuthenticated();
  const user: IUserState | null = useAuthUser();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [bookingHours, setBookingHours] = useState<IBookingHours>();
  const selectedTimeRef = useRef<string>("");
  const [valids, setValids] = useState<validatedBookingForm>({
    email: validateStatus.correct,
    username: validateStatus.correct,
    phoneNumber: validateStatus.correct,
    time: validateStatus.correct,
    numberOfGuests: validateStatus.correct,
  });

  useEffect(() => {
    async function fetchBookingHours() {
      try {
        const response = await fetch("/api/booking/booking_hours", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: pickedDate.toISOString().split("T")[0],
          }),
        });
        if (!response.ok) {
          throw new Error("Couldn't fetch booking hours from the server");
        }
        const data: IBookingHours = await response.json();
        setBookingHours(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBookingHours();
  }, [pickedDate]);
  function clearInputs() {
    inputRefs.current.forEach((input) => {
      input.value = "";
    });
    setPickedDate(new Date());
    setBookingHours(undefined);
    if (textAreaRef && textAreaRef.current !== null) {
      textAreaRef.current.value = "";
    }
  }
  async function bookTable(inputs: bookTableType) {
    try {
      const response = await fetch("/api/booking/book_table", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          email: inputs.email,
          phoneNumber: inputs.phoneNumber,
          date: inputs.date,
          time: inputs.time,
          user: inputs.user,
          extraInfo: inputs.extraInfo,
          numberOfGuests: inputs.numberOfGuests,
        }),
      });
      const data = await response.json();

      if (data.message !== "success") {
        setValids(data);
        return;
      }
      setValids(data);
      clearInputs();
      console.log(`Successfully booked a table`);
      // todo: show popup with success
    } catch (err) {
      console.error(err);
    }
  }

  async function handleClick(e: any) {
    e.preventDefault();
    if (!pickedDate && !selectedTimeRef && !textAreaRef) {
      return;
    }
    const [phoneNumber] = getInputValues();
    const extraInfo = textAreaRef.current?.value ?? "";
    const time = selectedTimeRef.current;
    if (isAuth) {
    }
    if (!inputRefs) {
      return;
    }
    const [username, email, numberOfGuests] = getInputValues();
    const validator = new BookingValidator();
    const isValid = validator.validateForm(
      email,
      username,
      phoneNumber,
      Number(numberOfGuests),
      time,
    );

    setValids(isValid);
    if (
      !Object.values(isValid).every((valid) => valid === validateStatus.correct)
    ) {
      return;
    }
    await bookTable({
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      date: pickedDate.toISOString().split("T")[0],
      time: time,
      user: isAuth,
      extraInfo: extraInfo,
      numberOfGuests: Number(numberOfGuests),
    });
  }

  function getInputValues() {
    return inputRefs.current.map((input) => input.value);
  }
  function addInputRef(ref: HTMLInputElement) {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  }

  function bookingForm() {
    if (isAuth) {
      return (
        <>
          <p className="mb-2 text-center">Witaj {user?.username}</p>
          <Input
            {...guestInputs[2]}
            key={guestInputs[2].id + 1}
            ref={(ref: HTMLInputElement) => addInputRef(ref)}
            valid={valids[guestInputs[2].name]}
          />
        </>
      );
    } else {
      return guestInputs.map((element, index) => (
        <Input
          {...element}
          key={index}
          ref={(ref: HTMLInputElement) => addInputRef(ref)}
          valid={valids[element.name]}
        />
      ));
    }
  }
  function handleTimeSelect(selectedTime: string) {
    selectedTimeRef.current = selectedTime;
  }
  async function handleDateChange(e: any) {
    setPickedDate(new Date(e));
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="background-image-w min-h-screen">
        <section className="shadow-around max-w-lg m-auto relativeshadow-2xl bg-white bg-opacity-70 p-6 rounded">
          <h1 className="text-3xl text-center">Book a table</h1>
          <form className="p-12 flex flex-col">
            {bookingForm()}
            <DatePicker
              onChange={(e) => handleDateChange(e)}
              disablePast
              label="Date"
              defaultValue={dayjs(pickedDate)}
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
            {bookingHours ? (
              <TimeSelector
                handleTimeSelect={handleTimeSelect}
                date={bookingHours.date}
                timeStamps={bookingHours.timeStamps}
                valid={valids.time}
              />
            ) : (
              <div className="w-full flex justify-center mt-4">
                <CircularProgress color="inherit" />
              </div>
            )}
            <TextArea
              ref={textAreaRef}
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
