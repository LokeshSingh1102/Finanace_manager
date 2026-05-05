import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Grarph from './pages/Grarph'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/setting' element={<Profile />} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
          <Route path='/signin' element={<Signin />} ></Route>
          <Route path='/graph' element={<Grarph />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
