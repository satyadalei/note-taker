import PageSection from "../components/PageSection"
import NoteTakeInputBox from "../components/note/NoteTakeInputBox"
import UsersAllNote from "../components/note/UsersAllNote"

const Notes = () => {
  return (
    <PageSection>
       <NoteTakeInputBox />
       <UsersAllNote />
    </PageSection>
  )
}

export default Notes