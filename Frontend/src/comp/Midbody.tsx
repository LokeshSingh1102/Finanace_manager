import React from 'react'
import Cards from './Cards'

function Midbody() {
    let ids = ['Food', 'Entertainment', 'Travel']
    return (
        <div className='flex justify-center items-center w-full h-96 bg-black'>
            {
                ids.map(id => {
                    return (
                        <Cards key={id} CardId={id} ></Cards>
                    )
                })
            }
        </div>
    )
}

export default Midbody