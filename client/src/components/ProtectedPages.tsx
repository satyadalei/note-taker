import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useAppSelector} from "../store/hooks"

interface ProtectedPagesContent{
    children: React.ReactNode
}
const ProtectedPages : React.FC<ProtectedPagesContent> = ({children}) => {
    const userAuthDetails = useAppSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(()=>{
        if (userAuthDetails.isLogedIn === false) {
            navigate("/signin")
        }  
    },[navigate, userAuthDetails.isLogedIn])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedPages