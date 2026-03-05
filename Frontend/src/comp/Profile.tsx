import React from 'react'
import Header from './Header'

function Profile() {
  return (
    <div className='w-screen h-screen '>
      <Header />
      <div className='flex fixed w-full h-full bg-blue-100 overflow-auto'>
        <div className='w-2/10 h-full m-2 p-2 border-2 border-black'>

          <p>this is profile page</p>
          <a href="/" >home</a>
          <br />
          <a href="/Signup" >Logout</a>
        </div>
        <div className='w-8/10 h-full border-2 m-2 p-2 border-black'>
          <p>this is profile page</p>
          <a href="/" >home</a>
          <br />
          <a href="/Signup" >Logout</a>

        </div>
      </div>
    </div>
  )
}

export default Profile