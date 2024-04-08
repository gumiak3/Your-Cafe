import Button from "../../components/Button";
import { ButtonType } from "../../types/common";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="background-image-w h-screen flex justify-center">
      <section className="max-w-7xl mt-24">
        <Link to={"/booking"}>
          <Button extraStyles={"rounded"} type={ButtonType.BUTTON}>
            Book a table
          </Button>
        </Link>
      </section>
    </div>
  );
}
