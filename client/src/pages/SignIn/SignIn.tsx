import { inputs } from "./SignIn.data";
import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { toast } from "react-toastify";
export default function SignIn() {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [valids, setValids] = useState<IValiidateLoginForm>({
    email: validateStatus.correct,
    password: validateStatus.correct,
  });
  const signIn = useSignIn();

  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

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
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Profile");
    }
  });
  async function handleClick(e: any) {
    const signInValidator = new SignInValidator();
    e.preventDefault();
    const [email, password] = getInputValues();
    const validatedForm = signInValidator.validateForm(email, password);
    setValids(validatedForm);

    if (
      Object.values(validatedForm).every(
        (valid) => valid === validateStatus.correct,
      )
    ) {
      try {
        const response = await fetch("/api/user/signin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          if (data.error === "Invalid password") {
            setValids({
              email: validateStatus.correct,
              password: validateStatus.passwordInvalid,
            });
          } else if (data.error === "No match for that user") {
            setValids({
              email: validateStatus.noUserFound,
              password: validateStatus.passwordInvalid,
            });
          }
          clearInputs();
          throw new Error(`Something went wrong with post`);
        }

        signIn({
          auth: {
            token: data.token,
            type: "Bearer",
          },
          userState: {
            username: data.user.username,
            id: data.user.id,
            access: data.user.type,
          },
        });
        // make a popup window which will notify a user about successful login in.
        toast.success(`Successfully logged in!`, {
          position: "top-center",
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  }

  function getInputValues() {
    return inputRefs.current.map((input) => input.value);
  }

  return (
    <div className="background-image-w h-screen relative">
      <div className="shadow-around max-w-lg m-auto relative top-20  shadow-2xl bg-white bg-opacity-70 rounded md:px-6 pt-6 ">
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
          <Button type={ButtonType.SUBMIT} handleClick={handleClick}>
            Login
          </Button>
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
