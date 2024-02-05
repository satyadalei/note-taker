import React from "react";
import { Link } from "react-router-dom";

interface RedirectSentence{
    redirectSentence: string;
    redirectLink : string;
    redirectShownText : string;
    className? : string;
    linkClassName? : string;
}
const RedirectNotice : React.FC<RedirectSentence> = ({redirectSentence, redirectLink, redirectShownText, className, linkClassName }) => {
  return (
    <p className={`ml-0 m-1 ${className}`} >{redirectSentence} <Link className={` text-blue-500 ${linkClassName}`} to={redirectLink} >{redirectShownText}</Link></p>
  )
}

export default RedirectNotice