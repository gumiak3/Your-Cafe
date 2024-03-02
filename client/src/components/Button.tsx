import {ButtonProps} from "../types/common";
export default function Button({type, text, handleClick} : ButtonProps){
    return (
        <button className="bg-orange-500 w-full p-3 text-white uppercase" onClick={handleClick} type={type}>
            {text}
        </button>
    )
}