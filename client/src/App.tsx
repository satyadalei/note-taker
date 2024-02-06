import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Profile from './pages/Profile'
import ArchivedNotes from './pages/ArchivedNotes'
import Error from './pages/Error'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Footer from './components/Footer'
import ProtectedPages from './components/ProtectedPages'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notes" element={<ProtectedPages children={<Notes />} />} />
          <Route path="/profile" element={<ProtectedPages children={<Profile />} />} />
          <Route path="/archives" element={<ProtectedPages children={<ArchivedNotes />} />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
