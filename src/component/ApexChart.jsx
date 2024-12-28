import Chart from "react-apexcharts";
import {useEffect, useRef, useState} from "react";
import useSocket from "../api/useSocket.js";
import {useCandlesticks} from "../api/useCandlesticks.js";
import Loading from "./Loading.jsx";

const ApexChart = ({coin}) => {
    const {data: candle, isLoading, error} = useCandlesticks(coin.symbol.toUpperCase())
    const data = useSocket();
    const [state, setState] = useState([]);

    const options = {
        chart: {
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


    console.log(candle)

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

    console.log(candleData)

    // useEffect(() => {
    //     if (data.event === "update") {
    //         const last = +data.result.o;
    //         const high24 = +data.result.h;
    //         const low24 = +data.result.l;
    //         const lowAsk = +data.result.c;
    //         const time = data.time;
    //
    //         const obj = {
    //             x: time,
    //             y: [lowAsk, high24, low24, last],
    //         };
    //
    //
    //         setState((prev) => {
    //             if (prev[prev.length - 1]?.x !== obj.x) {
    //                 return [...prev, obj].slice(-60);
    //             } else {
    //                 return prev;
    //             }
    //         });
    //     }
    // }, [data]);


    const series = [
        {
            data: candleData,
        },
    ];

    return <Chart options={options} series={series} type="candlestick" height={350} width={1012} />;
};

export default ApexChart;
