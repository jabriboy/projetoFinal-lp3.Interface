import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login/Login"
import Chat from './pages/Chat/Chat'
import Add from './pages/Add/Add'
import { Provider } from "react-redux"
import {store} from './store'
import './App.css'
import SignIn from './pages/SignIn/SignIn'

function App() {

  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/signin' element={<SignIn/>}/>
        </Routes>
      </Router>
    </Provider>
    </>
  )
}

export default App
