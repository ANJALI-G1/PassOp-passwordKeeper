import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Logout from './pages/Logout'
import Passwords from './pages/Passwords'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/passwords' element={<Passwords/>}/>
    </Routes>
    <Footer/>
    </>
    
  )
}

export default App