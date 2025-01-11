import Chart from "react-apexcharts";
import {useCandlesticks} from "../api/useCandlesticks.js";
import Toastify from "./Toastify.jsx";

const ApexChart = ({coin}) => {
    const {data: candle, isLoading, error} = useCandlesticks(coin.symbol.toUpperCase())


    if (error) return <div>{error.message}</div>
    if (isLoading) return

    const options = {
        chart: {
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            },
            pan: {
                enabled: false,
            },
            responsive: true,
            height: 350,
            width: '100%',
            type: 'candlesticks',
            background: '#212121',
        },
        title: {
            text: '',
        },
        xaxis: {
            type: "datetime",
            format: 'YYYY-MM-DD HH:mm:ss',
            labels: {
                style: {
                    colors: "#F5F5F5",
                    width: '100%',
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#F5F5F5",
                }
            }
        }
    };


    const candleData = candle.map(data => {
        return {
            x: data[0],
            y: [
                data[1],
                data[2],
                data[3],
                data[4],
            ]
        }
    })

    const series = [
        {
            data: candleData,
        },
    ];

    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-none">
            <div className="whitespace-nowrap w-[1012px]">
                <Chart options={options} series={series} type="candlestick" height={350} />
            </div>
            <Toastify />
        </div>
    );
};

export default ApexChart;
