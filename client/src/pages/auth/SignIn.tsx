import { useState, ChangeEvent } from "react";
import PageSection from "../../components/PageSection";
import GeneralButton from "../../components/common/GeneralButton";
import GeneralHeading from "../../components/common/GeneralHeading";
import InputElement from "../../components/common/InputElement";
import RedirectNotice from "../../components/common/RedirectNotice";
import { signInUser } from "../../services/user";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "satyanarayandalei9809@gmail.com",
    password: "satya123",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials((prev) => {
      const newValue: string = e.target.value;
      return { ...prev, [e.target.name]: newValue }
    })
  }

  const handleSignIn = async () => {
    // validate user email and password before calling function
    signInUser(loginCredentials.email, loginCredentials.password)
    .then((result) =>{
      console.log(result);
      
      if (result.isSuccess) {
        // save content to storage by stringyfying them
        localStorage.setItem("authToken", JSON.stringify(result.data.authToken));
        localStorage.setItem("userInfo", JSON.stringify(result.data.user));
        // redirect to note page
        navigate("/note");
      }else{
        // alert user that login failed
        // console.log(result.data.message);  
        window.alert(result.data.message);      
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
