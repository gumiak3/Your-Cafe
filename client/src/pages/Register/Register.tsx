import { inputs } from "../Register/Register.data";

import React, { useRef, useState } from "react";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import { ButtonType, IValidateForm, validateStatus } from "../../types/common";
import { registerValidator } from "./registerValidator";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [valids, setValids] = useState<IValidateForm>({
    username: validateStatus.correct,
    email: validateStatus.correct,
    password: validateStatus.correct,
    repeatedPassword: validateStatus.correct,
  });
  const navigate = useNavigate();
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
  function getInputValues() {
    const values = inputRefs.current.map((input) => input.value);
    return values;
  }
  async function handleClick(e: any) {
    e.preventDefault();
    const [username, email, password, repeatedPassword] = getInputValues();
    const validatedForm = registerValidator.validateForm(
      username,
      email,
      password,
      repeatedPassword,
    );
    setValids(validatedForm);
    setSuccessfullyRegistered(false);

    if (
      Object.values(validatedForm).every(
        (valid) => valid === validateStatus.correct,
      )
    ) {
      try {
        const response = await fetch("/api/user/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        });
        if (!response.ok) {
          throw new Error(`Something went wrong with post`);
        }
        const data = await response.json();
        if (
          !Object.values(data).every(
            (valid) => valid === validateStatus.correct,
          )
        ) {
          setValids(data);
          clearPasswordInputs();
          return;
        }
        setValids(data);
        clearInputs();
        setSuccessfullyRegistered(true);
        setTimeout(() => {
          navigate("/SignIn");
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function addInputRef(ref: HTMLInputElement) {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  }
  function clearInputs() {
    inputRefs.current.forEach((input) => {
      input.value = "";
    });
  }
  function clearPasswordInputs() {
    inputRefs.current.forEach((input) => {
      if (input.name === "password") {
        input.value = "";
      }
    });
  }
  console.log(valids);
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
          <Button type={ButtonType.SUBMIT} handleClick={handleClick}>
            Sign up
          </Button>
          {successfullyRegistered ? (
            <p className="mt-4 mb-0 text-center text-green-400">
              Successfully registered!
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
