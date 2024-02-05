import React from "react";

interface ButtonContent{
    buttonText?: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const GeneralButton : React.FC<ButtonContent> = ({buttonText, className, onClick }) => {
  return (
    <button onClick={onClick} className={` bg-blue-500 rounded p-2 text-white hover:bg-blue-700 mt-1 mb-1 transition ${className}`} type="button" >
        {buttonText || "General Button"}
    </button>
  )
}

export default GeneralButton