import React from 'react'
interface InputComponent {
    label: string;
    type: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    labelClassName?: string;
    inputBoxClassName?: string;
    autoComplete?: string;
}


const InputElement: React.FC<InputComponent> = ({ type, name, label, value, onChange, labelClassName, inputBoxClassName, autoComplete }) => {
    return (
        <div className="flex flex-col m-1" >
            <label htmlFor={label} className={`m-1 ml-0 ${labelClassName}`} >{label}</label>
            <input autoComplete={autoComplete || "off"} className={`border border-gray-400 outline-none p-1  ${inputBoxClassName}`} onChange={onChange} value={value} type={type} name={name} />
        </div>
    )
}

export default InputElement