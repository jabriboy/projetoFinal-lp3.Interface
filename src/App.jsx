import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login/Login"
import Chat from './pages/Chat/Chat'
import Add from './pages/Add/Add'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/add' element={<Add/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
