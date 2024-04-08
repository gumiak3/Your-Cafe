import { guestInputs } from "./Booking.data";
import { Input } from "../../components/Input";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { userStateI } from "../../types/common";
import TermMonths from "../../components/Booking/TermMonths";

export default function Booking() {
  const isAuth = useIsAuthenticated();
  const user: userStateI | null = useAuthUser();
  function bookingForm() {
    console.log(user?.username, isAuth);
    if (isAuth) {
      return <div>Welcome {user?.username}</div>;
    } else {
      return guestInputs.map((element, index) => (
        <Input {...element} key={index} />
      ));
    }
  }

  return (
    <div className="background-image-w min-h-screen">
      <section className="max-w-7xl m-auto">
        <h1 className="text-3xl text-center text-white">Book a table</h1>
        <form className="p-12 text-white">
          {bookingForm()}
          <TermMonths />
        </form>
      </section>
    </div>
  );
}
