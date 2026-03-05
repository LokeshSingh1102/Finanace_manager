import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import './App.css'
import Home from './comp/Home'
import Profile from './comp/Profile'
import Signup from './comp/Signup'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/setting' element={<Profile />} ></Route>
          <Route path='/Signup' element={<Signup />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
