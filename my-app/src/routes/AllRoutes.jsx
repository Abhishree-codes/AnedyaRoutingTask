import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Profile from '../pages/Profile'
import Home from '../pages/Home'
import PrivateRoute from './PrivateRoute'
import { Heading } from '@chakra-ui/react'

function AllRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<PrivateRoute><About/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path='*' element={<Heading>The page you are looking for doesn't exist </Heading>} />
    </Routes>
  )
}

export default AllRoutes
