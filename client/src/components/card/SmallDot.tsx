import React,{ MouseEventHandler } from "react";

interface SmallDotContent{
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>
}
const SmallDot: React.FC<SmallDotContent> = ({className, onClick}) => {
  return (
    <span onClick={onClick} className={`block w-0.5 h-0.5 mb-0.5 rounded-full bg-gray-600 ${className}`} ></span>
  )
}

export default SmallDot