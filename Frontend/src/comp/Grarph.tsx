import { Chart as ChartJS} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import data from '../data/data.json'


function Grarph() {
    return (
        <div className="w-full h-100 flex justify-center items-center">
            <p>total sva</p>
            <Line
                data={{
                    labels: data.map((x)=> x.label),
                    datasets: [
                        {
                            label: 'savings',
                            data: data.map((x)=>x.savings),
                        },
                        {
                            label: 'expenses',
                            data: data.map((x)=>x.expend),
                        },
                    ],
                }}
            />
        </div>
    )
}

export default Grarph