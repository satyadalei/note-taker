import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
interface ProtectedPagesContent{
    children: React.ReactNode
}
const ProtectedPages : React.FC<ProtectedPagesContent> = ({children}) => {
    console.log("I am Protected");
    const navigate = useNavigate();
    const isAuthenticated  = localStorage.getItem("authToken");
    const isLogedIn = localStorage.getItem("isLogIn");

    useEffect(()=>{
        if (!isAuthenticated && !isLogedIn) {
            navigate("/signin")
        }  
    },[])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedPages