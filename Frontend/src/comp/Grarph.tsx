import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import data from '../data/data.json'


function Grarph() {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-200 h-100">

                <p>total savings</p>
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
                                data: data.map((x) => x.expend),
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default Grarph