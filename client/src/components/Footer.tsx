import RedirectNotice from "./common/RedirectNotice"

const Footer = () => {
  return (
    <div className="bg-black min-h-52 w-full text-white flex flex-col justify-center items-center">
        <p>All rights reserved {new Date().getFullYear()}</p>
        <RedirectNotice redirectSentence="Designed & Developed by" redirectLink="https://devsatya.cyclic.app/" redirectShownText="Satyanarayan Dalei" />
    </div>
  )
}

export default Footer