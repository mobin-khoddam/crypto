import Chart from "react-apexcharts";
import {useCandlesticks} from "../api/useCandlesticks.js";
import Loading from "./Loading.jsx";
import Toastify from "./Toastify.jsx";

const ApexChart = ({coin}) => {
    const {data: candle, isLoading, error} = useCandlesticks(coin.symbol.toUpperCase())


    if (error) return <div className='text-red-500'>{error.message} <Toastify /></div>
    if (isLoading) return <div className='h-20 pb-2 w-full'><Loading className='mt-0 translate-x-0 !static mx-auto' childClass='dark:bg-dark-color' /></div>

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
        <div dir='ltr' className="w-full overflow-x-auto pb-4 scrollbar-none">
            <div className="whitespace-nowrap w-[1012px]">
                <Chart options={options} series={series} type="candlestick" height={330} />
            </div>
        </div>
    );
};

export default ApexChart;
