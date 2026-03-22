import { useState } from 'react'
import Header from './Header'
import axios from 'axios';

function Profile() {
  const [amount, setAmount] = useState(0);
  const [budget, setBudget] = useState(0);
  const [category, setCategory] = useState("");

  const submitSaving = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8787/saving/save',
        {
          amount: amount,
          category:category,
          budget:budget
        }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      alert(res.data)
    } catch (error) {
      alert('Did not saved the data')
    }
  }
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
          
          <label>Add your Budget : </label>
          <input type='number' className='border' value={budget} onChange={(e) => {
            setBudget(parseInt(e.target.value))
          }}></input>

          <label>how much saving you want to do in this month : </label>
          <input type='number' className='border' value={amount} onChange={(e) => {
            setAmount(parseInt(e.target.value))
          }}></input>
          
          <label>Enter the category : </label>
          <input type='text' className='border' value={category} onChange={(e) => {
            setCategory(e.target.value)
          }}></input>

          <button onClick={submitSaving}>submit</button>

        </div>
      </div>
    </div>
  )
}

export default Profile