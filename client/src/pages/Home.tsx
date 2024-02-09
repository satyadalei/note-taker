import { useEffect } from "react"
import PageSection from "../components/PageSection"
import GeneralButton from "../components/common/GeneralButton"
import { useAppSelector } from "../store/hooks";
import {useNavigate} from "react-router-dom"
const Home = () => {
  const userAuthDetails = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(()=>{
   if (userAuthDetails.isLogedIn) {
      navigate("/notes")
   }
  },[navigate, userAuthDetails.isLogedIn])
  return (
    <PageSection>
      <div className="pt-40 flex flex-col justify-center items-center" >
        <h1 className="text-8xl font-extrabold mb-16 text-center" >Write your note easily.</h1>
        <GeneralButton className="p-4 rounded-full text-sm md:text-lg" buttonText="Get started" />
      </div>
    </PageSection>
  )
}

export default Home