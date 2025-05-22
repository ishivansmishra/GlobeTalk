import React, { useContext } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Profilepage from './pages/Profilepage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'


const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div  className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}></Route>
         <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>}></Route>
          <Route path='/profile' element={authUser ? <Profilepage/> : <Navigate to="/login"/>}></Route>
      </Routes>
    </div>
  )
}

export default App
