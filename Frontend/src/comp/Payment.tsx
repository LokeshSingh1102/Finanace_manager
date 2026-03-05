import React from 'react'

function Payment() {
  return (
    <div className='w-screen h-full flex justify-center align-center'>
        <label htmlFor="amnt">Enter the Amount</label>
        <input type="text" id='amnt' />
    </div>
  )
}

export default Payment