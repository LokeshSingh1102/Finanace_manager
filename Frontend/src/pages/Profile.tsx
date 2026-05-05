import { useState } from 'react'
import Header from '../comp/Header'
import axios from 'axios';

export default function Profile() {
  const [display, setDisplay] = useState("")

  return (
    <div className='w-screen h-screen '>
      <Header />
      <div className='flex fixed w-full h-full bg-blue-100 overflow-auto'>
        <div className='w-2/10 h-full m-2 p-2 border-2 border-black'>

          <p>this is profile page</p>
          <p className='cursor-pointer' onClick={() => {
            setDisplay('budget')
          }} >Budget</p>
          <p className='cursor-pointer' onClick={() => {
            setDisplay('saving')
          }} >Saving</p>
          <br />
          <a href="/Signup" >Logout</a>
        </div>
        <RenderView segment={display} />
      </div>
    </div>
  )
}



// --------------------------------------------------------------------------------------------------------------------------



function RenderView({ segment }: { segment: string }) {
  const submitBudget = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8787/saving/budget', {
        amount: budget,
        category: category
      }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      setBudget(0)
      setCategory("")
      alert(res.data)
    } catch (error) {
      alert('data not saved try again')
    }
  }

  const submitSaving = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8787/saving/save',
        {
          amount: amount,
          category: category,
          budget: budget
        }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      setBudget(0)
      setAmount(0)
      setCategory("")
      alert(res.data)
    } catch (error) {
      alert('Did not saved the data')
    }
  }
  const [amount, setAmount] = useState(0);
  const [budget, setBudget] = useState(0);
  const [category, setCategory] = useState("");
  // return <>jnjnnjnjn</>
  switch (segment) {

    case 'budget':

      return <div className='w-8/10 h-full border-2 m-2 p-2 border-black'>

        <div className='flex flex-col '>
          <label>Add your Budget for the below category : </label>
          <input type='number' className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 border w-64' value={budget} onChange={(e) => {
            setBudget(parseInt(e.target.value))
          }}></input>
        </div>

        <div className='flex flex-col '>

          <label>Add Category : </label>
          <input type='text' className='border w-64' value={category} onChange={(e) => {
            setCategory(e.target.value)
          }}></input>
        </div>

        <button className='border mt-3 rounded p-1 cursor-pointer' onClick={submitBudget}>submit</button>
      </div>

    case 'saving':

      return <div className='w-8/10 h-full border-2 m-2 p-2 border-black'>
        <div className='bg-red-100'>

          <div className='flex flex-col '>

            <label>Add your Budget : </label>
            <input type='number' className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 border w-64' value={budget} onChange={(e) => {
              setBudget(parseInt(e.target.value))
            }}></input>
          </div>

          <div className='flex flex-col '>
            <label>how much saving you want to do in this month : </label>
            <input type='number' className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 border w-64' value={amount} onChange={(e) => {
              setAmount(parseInt(e.target.value))
            }}></input>
          </div>

          <div className='flex flex-col '>
            <label>Enter the category : </label>
            <input type='text' className='border w-64' value={category} onChange={(e) => {
              setCategory(e.target.value)
            }}></input>
          </div>

          <div>
            <button className='border rounded mt-3 cursor-pointer' onClick={submitSaving}>submit</button>
          </div>
        </div>

      </div>

    default:
      return <div className='w-8/10 h-full border-2 m-2 p-2 border-black'>
        Carpe diem

      </div>

  }
}