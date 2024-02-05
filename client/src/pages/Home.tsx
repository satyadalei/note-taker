import PageSection from "../components/PageSection"
import GeneralButton from "../components/common/GeneralButton"

const Home = () => {
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