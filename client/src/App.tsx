import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Profile from './pages/Profile'
import ArchivedNotes from './pages/ArchivedNotes'
import Error from './pages/Error'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/archives" element={<ArchivedNotes />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </>
  )
}

export default App
