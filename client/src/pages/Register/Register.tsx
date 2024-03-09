import { inputs } from "../Register/Register.data";

import React, { useRef, useState } from "react";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import { ButtonType } from "../../types/common";
import { registerValidator } from "./registerValidator";
import { IValiidateForm } from "../../types/common";
export default function Register() {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [valids, setValids] = useState<IValiidateForm>({
    username: true,
    email: true,
    password: true,
  });
  function getInputValues() {
    const values = inputRefs.current.map((input) => input.value);
    return values;
  }

  function handleClick(e: any) {
    e.preventDefault();
    const validator = new registerValidator();
    const [username, email, password, repeatedPassword] = getInputValues();
    const valids = validator.validateForm(
      username,
      email,
      password,
      repeatedPassword,
    );
    setValids(valids);
  }

  function addInputRef(ref: HTMLInputElement) {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  }
  return (
    <div className="background-image-w h-screen relative">
      <div className="shadow-around max-w-lg m-auto relative top-20  shadow-2xl bg-white bg-opacity-70 p-6 rounded">
        <h2 className="text-3xl text-center">Sign up</h2>
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
          <Button
            text="Sign Up"
            type={ButtonType.SUBMIT}
            handleClick={handleClick}
          />
        </form>
      </div>
    </div>
  );
}
