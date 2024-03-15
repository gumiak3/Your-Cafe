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
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
  function getInputValues() {
    const values = inputRefs.current.map((input) => input.value);
    return values;
  }
  async function handleClick(e: any) {
    e.preventDefault();
    const [username, email, password, repeatedPassword] = getInputValues();
    const valids = registerValidator.validateForm(
      username,
      email,
      password,
      repeatedPassword,
    );
    setValids(valids);
    setSuccessfullyRegistered(false);
    if (Object.values(valids).every((valid) => valid)) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/register",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          },
        );
        if (!response.ok) {
          throw new Error(`Something went wrong with post`);
        }
        const data = await response.json();
        if (data.isTaken) {
          // if user is already in database
          // give specific error on client side
          console.log(data.isTaken);
          setValids(data);
          return;
        }
        // everything went ok
        clearInputs();
        setSuccessfullyRegistered(true);
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
