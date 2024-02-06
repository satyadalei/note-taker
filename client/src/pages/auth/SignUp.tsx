import PageSection from "../../components/PageSection"
import GeneralButton from "../../components/common/GeneralButton"
import GeneralHeading from "../../components/common/GeneralHeading"
import InputElement from "../../components/common/InputElement"
import RedirectNotice from "../../components/common/RedirectNotice"

const SignUp = () => {
  return (
    <PageSection>
      <div className="flex justify-center">
        <div className="w-[90%] md:w-[60%] max-w-md border border-black/35 p-6 rounded-md mt-5">
          <GeneralHeading headingText="Sign Up" />
          <div>
            <InputElement type="text" label="Name" name="name" />
            <InputElement type="text" label="Email" name="email" />
            <InputElement type="password" label="Password" name="password" />
            <GeneralButton buttonText="Sign Up" className="mt-3" />
            <RedirectNotice redirectSentence="Already member?" redirectLink="/signin" redirectShownText="Sign in" />
          </div>
        </div>
      </div>
    </PageSection>
  )
}

export default SignUp