import { Card, CardHeader, CardBody } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import ThreeDot from "./ThreeDot";


interface GeneralCard {
    className?: string;
    title?: string;
    content?: string;
}

const GeneralCard: React.FC<GeneralCard> = ({ className, title, content }) => {
    const [isHovered, setIsHovered] = useState(false);
    const threeDotRef = useRef<HTMLDivElement>(null);
    const [optionVisibility, setOptionVisibility] = useState(false);

    useEffect(() => {
        const handleClickOutsideNoteBox = (event: MouseEvent) => {
            if (threeDotRef.current && !threeDotRef.current.contains(event.target as Node)) {
                setOptionVisibility(()=>{
                    console.log("I small inside");
                //    console.log("Click outside___");
                   return false
                });
            }
            // setOptionVisibility(false)
            // console.log("__",event);
        }
        document.addEventListener("click", handleClickOutsideNoteBox);
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutsideNoteBox);
        };
    })

    return (
        <Card onMouseOver={() => { setIsHovered(true) }} onMouseOut={() => { setIsHovered(false) }} className={`py-4 w-full sm:w-48 md:w-60 ${className}`}>
            {title !== undefined && title?.length > 0 &&
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{title}</p>
                </CardHeader>
            }
            <CardBody className="overflow-visible py-2">
                <small className="text-default-500">{content}</small>
                <div className="mt-5 flex justify-end h-5" >
                    {
                        isHovered && 
                        <ThreeDot onClick={() => {setOptionVisibility(true)}} 
                        ref={threeDotRef} className="w-5 h-5 flex flex-col items-center justify-center rounded-full transition-background hover:bg-gray-400" />
                    }
                    {optionVisibility && <>I am</>}
                </div>
            </CardBody>
        </Card>
    )
}

export default GeneralCard