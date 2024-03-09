import { inputs } from "./SignIn.data";
import React, { useState } from "react";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import { ButtonType, InputType, IValiidateLoginForm } from "../../types/common";
import InputCheckbox from "../../components/InputCheckbox";
import { Link } from "react-router-dom";
export default function SignIn() {
  const [valids, setValids] = useState<IValiidateLoginForm>({
    email: true,
    password: true,
  });
  function handleClick(e: any) {
    e.preventDefault();
    console.log("Trying to login...");
  }
  return (
    <div className="background-image-w h-screen relative">
      <div className="shadow-around max-w-lg m-auto relative top-20  shadow-2xl bg-white bg-opacity-70 p-6 rounded">
        <h2 className="text-3xl text-center">Welcome back</h2>
        <form className="p-12">
          {inputs.map((input, index) => {
            return <Input {...input} key={index} valid={valids[input.name]} />;
          })}
          <div className="flex justify-between">
            <InputCheckbox
              id={"rememberMe"}
              label={"Remember me"}
              name={"rememberMe"}
              type={InputType.CHECKBOX}
            />
            <p className="text-gray-600">
              <Link to="/ResetPassword">Forget password?</Link>
            </p>
          </div>
          <Button
            type={ButtonType.SUBMIT}
            text="Login"
            handleClick={handleClick}
          />
          <div>
            <Link className="flex justify-center mt-4" to="/Register">
              Don't have an account?<strong className="ml-2"> Register</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
