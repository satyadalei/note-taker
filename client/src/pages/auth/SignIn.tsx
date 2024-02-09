import { useState, ChangeEvent } from "react";
import PageSection from "../../components/PageSection";
import GeneralButton from "../../components/common/GeneralButton";
import GeneralHeading from "../../components/common/GeneralHeading";
import InputElement from "../../components/common/InputElement";
import RedirectNotice from "../../components/common/RedirectNotice";
import { LoginUserResponseData, ResponseUserInfo, signInUser } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {setIsLogedIn} from "../../store/slices/user"

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials((prev) => {
      const newValue: string = e.target.value;
      return { ...prev, [e.target.name]: newValue }
    })
  }

  const handleSignIn = async () => {
    // validate user email and password before calling function
    const {email, password} =  loginCredentials
    signInUser(email, password)
    .then((result) =>{
      if (result.isSuccess) {
        const authToken: string | undefined = result.responseData?.data?.authToken;
        const userInfo: ResponseUserInfo = (result.responseData?.data as LoginUserResponseData ).user;
        // save content to storage by stringyfying them
        localStorage.setItem("authToken", authToken as string);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));  
        localStorage.setItem("isLogedIn", "true");   
        
        // change login status & user info
        dispatch(setIsLogedIn(userInfo));
        // redirect to note page
        navigate("/notes");
      }else{
        // alert user that login failed 
        window.alert(result.responseData.message.split("#")[0]);      
      }
    })
  }




  return (
    <PageSection className="pt-5">
      <div className="flex justify-center">
        <div className="w-[90%] md:w-[60%] max-w-md border border-black/35 p-6 rounded-md mt-5">
          <GeneralHeading headingText="Sign In" />
          <div>
            <InputElement onChange={handleChange} type="text" label="Email" name="email" value={loginCredentials.email} />
            <InputElement onChange={handleChange} type="password" label="Password" name="password" value={loginCredentials.password} />
            <GeneralButton onClick={handleSignIn} buttonText="Sign In" className="mt-3" />
            <RedirectNotice redirectSentence="New member?" redirectLink="/signup" redirectShownText="Sign up" />
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default SignIn;
