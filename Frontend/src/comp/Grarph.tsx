import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import data from '../data/data.json'
import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";

interface expense {
    id: string,
    amount: number,
    category: string,
    payment_to: string,
    userId: string

}

function Grarph() {
    const [expend, setExpend] = useState<expense[]>([])
    const [check, setCheck] = useState(0)
    const [category, setCategory] = useState("")

    // let expendData: expense[]=[]
    // let ttl = 0
    useEffect(() => {
        let dummy:expense[] = []
        setCheck(prev=>prev*0)
        axios.get(`http://127.0.0.1:8787/expense/allexpense/:${category}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => {

            console.log('data', res.data.data);
            dummy=res.data.data
            // setExpend(dummy)
            console.log(dummy);
            
            dummy.map(e => {
                setCheck(prev => prev + e.amount)
            })
            console.log(check);
            
        })
    }, [category])

    const chosenOption = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-200 h-100">

                <p>total savings</p>
                <label htmlFor="cars">Choose a category:</label>

                <select name="cars" id="cars" onChange={(e) =>{
                     chosenOption(e)
                     }}>
                    <option value="" disabled selected></option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                </select>

                <Line
                    data={{
                        labels: data.map((x) => x.label),
                        datasets: [
                            {
                                label: 'savings',
                                data: data.map((x) => x.savings),
                            },
                            {
                                label: 'expenses',
                                data: data.map((x) => {
                                    return x.label === 'Aug' ? check : x.expend
                                }),
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default Grarph