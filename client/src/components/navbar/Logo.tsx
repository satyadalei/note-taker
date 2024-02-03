import React from "react";
import { Link } from "react-router-dom";

interface LogoComponentProps {
  logoText?: string;
  className?: string;
}
const Logo: React.FC<LogoComponentProps> = ({ logoText, className }) => {
  return (
    <div className={`text-2xl font-bold text-white ${className}`} >
      {/* This link will redirect to home page or notes page based on user login status */}
      <Link to="/notes" >
        <span >{logoText}</span>
        <span  >Note Taker</span>
      </Link>
    </div>
  )
}

export default Logo
