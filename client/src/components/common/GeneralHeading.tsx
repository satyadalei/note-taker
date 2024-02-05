import React from "react";

interface GeneralHeadingTextContent{
    headingText : string;
    className? : string;
}

const GeneralHeading : React.FC<GeneralHeadingTextContent> = ({headingText, className} ) => {
  return (
    <h1 className={`text-lg font-bold ${className}`} >{headingText}</h1>
  )
}

export default GeneralHeading