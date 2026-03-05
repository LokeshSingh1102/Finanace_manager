import React, { useState } from "react"

interface IPROPS {
    // key: String,
    CardId: String
}

let Cards: React.FC<IPROPS> = ({ CardId }) => {

    const [show, setShow] = useState(true)
    const [history, setHistory] = useState([{ "name": "", "amount": 0 }])
    const [currName, setCurrName] = useState("")
    const [amt, setAmt] = useState(0)

    const submitDetails = () => {
        setHistory(prev => [...prev, { "name": currName, "amount": amt }])
        setAmt(0)
        setCurrName("")
    }
    // console.log(CardId)
    return (
        <div>
            {show ? 
             <div className='w-80 h-64 bg-slate-600 m-5 cursor-pointer rounded-md' onClick={() => {
                // window.location.href = '/Travel'
                setShow(!show)
            }} >
                <h2 className="p-2"> <b> {CardId} details </b> </h2>
                <div>
                    {history.length == 1 ? "" : history.slice(1).map((his, idx) => {
                        return (
                            <p className="m-2" key={idx}> {his.name||""} : {his.amount} </p>
                        )
                    })}
                </div>
            </div>
                :
                <div className='w-80 h-64 bg-slate-600 m-5 relative rounded-md' >
                    <div className="m-2">
                        <label htmlFor="paid">Paid to</label>
                        <input type="text" id="paid" className="bg-white absolute right-4 w-32" value={currName} onKeyDown={(e) => {
                            if(e.key==='Enter'){
                                submitDetails()
                            }
                        }} onChange={(e) => {
                                setCurrName(e.target.value)
                            }} />
                    </div>
                    {/* payment content */}
                    <div className="m-2">
                        <label htmlFor="amnt">Enter the Amount :</label>
                        <input className="bg-white w-32 absolute right-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0" type="number" id='amnt' value={amt} onKeyDown={(e)=>{
                            if(e.key==='Enter'){
                                submitDetails()
                            }
                        }} onChange={(e) => {
                            setAmt(parseInt(e.target.value))
                        }} />
                    </div>
                    <div className="absolute bottom-0 w-full">
                        <button className="block w m-auto cursor-pointer bg-white" onClick={()=>submitDetails() }>pay</button>
                        <button className="block m-auto cursor-pointer bg-white" onClick={() => {
                            // window.location.href = '/Travel'
                            setShow(!show)
                        }}>details</button>
                    </div>
                </div>
            }
        </div >
    )
}

export default Cards