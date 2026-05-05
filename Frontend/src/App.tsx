import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './comp/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/setting' element={<Profile />} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
          <Route path='/signin' element={<Signin />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
