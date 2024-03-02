import {inputs} from "./SignIn.data";
import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {ButtonType, InputType} from "../../types/common";
import InputCheckbox from "../../components/InputCheckbox";
import leftSideImage from '../../assets/left-side-bar.jpg'

export default function SignIn() {
    function handleClick(e : any){
        e.preventDefault();
        console.log("Trying to login...");
    }
  return (
      <div className="background-image-w h-screen relative">
          <div className="shadow-around max-w-lg m-auto relative top-20  shadow-2xl bg-white bg-opacity-70 p-6 rounded">
              <h2 className="text-3xl text-center">Welcome back</h2>
              <form className="p-12">
                  {inputs.map((input, index) => {
                      return <Input {...input} key={index}/>;
                  })}
                  <div className="flex justify-between">
                      <InputCheckbox id={"rememberMe"} label={"Remember me"} name={"rememberMe"} type={InputType.CHECKBOX}/>
                      <p className="text-gray-400"><a href="/ResetPassword">Forget password?</a></p>
                  </div>
                  <Button type={ButtonType.SUBMIT} text="Login" handleClick={handleClick}/>
              </form>
          </div>
      </div>

  );
}
