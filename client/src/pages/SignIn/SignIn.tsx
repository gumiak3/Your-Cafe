import { inputs } from "./SignIn.data";
import React, { useRef, useState } from "react";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import {
  ButtonType,
  InputType,
  IValiidateLoginForm,
  validateStatus,
} from "../../types/common";
import InputCheckbox from "../../components/InputCheckbox";
import { Link } from "react-router-dom";
import { SignInValidator } from "./SignInValidator";
export default function SignIn() {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [valids, setValids] = useState<IValiidateLoginForm>({
    email: validateStatus.correct,
    password: validateStatus.correct,
  });

  function addInputRef(ref: HTMLInputElement) {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  }
  async function handleClick(e: any) {
    e.preventDefault();
    const [email, password] = getInputValues();
    const validatedForm = SignInValidator.validateForm(email, password);
    console.log(validatedForm);
    if (
      Object.values(validatedForm).every(
        (valid) => valid === validateStatus.correct,
      )
    ) {
      try {
        const response = await fetch("http://localhost:5000/api/user/signin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          console.log(response);
          throw new Error(`Something went wrong with post`);
        }
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  }
  function getInputValues() {
    const values = inputRefs.current.map((input) => input.value);
    return values;
  }
  return (
    <div className="background-image-w h-screen relative">
      <div className="shadow-around max-w-lg m-auto relative top-20  shadow-2xl bg-white bg-opacity-70 p-6 rounded">
        <h2 className="text-3xl text-center">Welcome back</h2>
        <form className="p-12">
          {inputs.map((input, index) => {
            return (
              <Input
                {...input}
                key={index}
                ref={(ref: HTMLInputElement) => addInputRef(ref)}
                valid={valids[input.name]}
              />
            );
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
