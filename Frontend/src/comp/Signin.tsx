import axios from 'axios'
import React, { useState } from 'react'

function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const u = "lokeshsingh9163@gmail.com"
    // const p = "12345678"
    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:8787/user/signin', {
                username: username,
                password: password
            },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            console.log(res.data);
            localStorage.setItem('token',res.data.token)
            window.location.href = '/'
        } catch (error) {
            console.log(error);
            alert("username or password is incorrect")
        }

    }
    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }
    return (
        <div className='h-screen w-screen bg-black flex justify-center items-center bg-blue-100' >
            <div className='h-64 w-68 bg-blue-200 rounded-sm relative'>
                <div className='h-8/10 '>

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

        </div>)
}

export default Signin