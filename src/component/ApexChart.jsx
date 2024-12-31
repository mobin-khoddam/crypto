import Chart from "react-apexcharts";
import {useCandlesticks} from "../api/useCandlesticks.js";

const ApexChart = ({coin}) => {
    const {data: candle, isLoading, error} = useCandlesticks(coin.symbol.toUpperCase())

    const options = {
        chart: {
            zoom: {
                enabled: false
            },
            responsive: true,
            height: 350,
            width: '100%',
            type: 'candlesticks',
            toolbar: {
                show: false,
            },
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
                    width: '100%'
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


    if (error) return

    if (isLoading) return

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

    return <Chart options={options} series={series} type="candlestick" height={350} width={1012} />;
};

export default ApexChart;
