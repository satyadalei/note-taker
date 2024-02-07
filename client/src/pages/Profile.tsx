import React from "react";
import PageSection from "../components/PageSection"
import { useAppSelector } from "../store/hooks"
import { ResponseUserInfo } from "../services/user";

interface UserInformation{
  infoHeading: string;
  info: string;
}

const UserInfo : React.FC<UserInformation> = ({infoHeading, info}) => {
  return (<div>
      <h2>{infoHeading}</h2>
      <p>{info}</p>
  </div>)
}

const Profile = () => {
  const userAuthDetails = useAppSelector((state) => state.user);
  const { userDetails } = userAuthDetails;  
  const { name, email} = userDetails as ResponseUserInfo;


  return (
    <PageSection>
      <div className="p-2" >
        <h1 className="text-lg font-bold m-2 ml-0" >Profile details</h1>
        <UserInfo infoHeading="Name" info={name} />
        <UserInfo infoHeading="Email" info={email} />
      </div>
    </PageSection>
  )
}

export default Profile