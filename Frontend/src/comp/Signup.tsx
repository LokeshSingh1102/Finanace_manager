import React, { useState } from 'react'

function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const u = "lokeshsingh9163@gmail.com"
    const p = "12345678"
    const handleSubmit = () => {
        if (username === u && password === p) {
            window.location.href = '/'
        }
        else {
            alert("username or password is incorrect")
        }
    }
    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }
    return (
        <div className='h-screen w-screen bg-black flex justify-center items-center' >
            <div className='h-64 w-68 bg-white relative'>
                <div className='h-8/10'>

                    <div className='m-2'>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id='username' className='absolute right-1 border-2 rounded-sm border-black ' onKeyDown={(e) => handleKey(e)} onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                    </div>
                    <div className='m-2'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id='password' className='absolute right-1 border-2 rounded-sm border-black' onKeyDown={(e) => handleKey(e)} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>
                </div>
                <div className='h-2/10 flex justify-center items-center'>
                    <button type='submit' className='cursor-pointer' onClick={() => {
                        // console.log(username, password);
                        handleSubmit()
                    }} >Signup</button>
                </div>
            </div>

        </div>
    )
}

export default Signup