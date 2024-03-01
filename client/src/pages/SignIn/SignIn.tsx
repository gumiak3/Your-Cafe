import { inputs } from "./SignIn.data";
import React from "react";
import Input from "../../components/Input";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <form>
        {inputs.map((input) => {
          return <Input {...input} />;
        })}
        {/*  button */}
      </form>
    </div>
  );
}
