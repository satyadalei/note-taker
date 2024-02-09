import { ChangeEvent, useState } from "react"
import PageSection from "../../components/PageSection"
import GeneralButton from "../../components/common/GeneralButton"
import GeneralHeading from "../../components/common/GeneralHeading"
import InputElement from "../../components/common/InputElement"
import RedirectNotice from "../../components/common/RedirectNotice"
import { signUpUser, FinalReturnData, ResponseUserInfo, NewUserResponseData } from "../../services/user"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setIsLogedIn } from "../../store/slices/user"


const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userSignupDetails, setUserSignUpDetails] = useState({
    email: "",
    name: "",
    password: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    setUserSignUpDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: newValue
      }
    })
  }

  const handleSignUp = async () => {
    const { email, password, name } = userSignupDetails
    signUpUser(email, password, name)
      .then((result: FinalReturnData) => {
        if (result.isSuccess) {
          const authToken: string | undefined = result.responseData?.data?.authToken;
          const userInfo: ResponseUserInfo = (result.responseData?.data as NewUserResponseData).newUser;
          // save content to storage by stringyfying them
          localStorage.setItem("isLogedIn", "true");
          localStorage.setItem("authToken", authToken as string);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          // change login status & user info
          dispatch(setIsLogedIn(userInfo))
          // redirect to note page
          navigate("/notes");
        } else {
          window.alert(result.responseData.message.split("#")[0]);
        }
      })
  }

  return (
    <PageSection>
      <div className="flex justify-center">
        <div className="w-[90%] md:w-[60%] max-w-md border border-black/35 p-6 rounded-md mt-5">
          <GeneralHeading headingText="Sign Up" />
          <div>
            <InputElement onChange={handleChange} value={userSignupDetails.name} type="text" label="Name" name="name" />
            <InputElement onChange={handleChange} value={userSignupDetails.email} type="text" label="Email" name="email" />
            <InputElement onChange={handleChange} value={userSignupDetails.password} type="password" label="Password" name="password" />

            <GeneralButton onClick={handleSignUp} buttonText="Sign Up" className="mt-3" />
            <RedirectNotice redirectSentence="Already member?" redirectLink="/signin" redirectShownText="Sign in" />
          </div>
        </div>
      </div>
    </PageSection>
  )
}

export default SignUp