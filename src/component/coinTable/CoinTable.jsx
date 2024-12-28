import Chart from "../Chart.jsx";
import Loading from "../Loading.jsx";
import Error from "../Error.jsx";
import {isProfitHandler} from "../../helper/isProfitHandler.js";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import useSocket from "../../api/useSocket.js";
import {useEffect, useState} from "react";
import Table from "./Table.jsx";

const CoinTable = ({coins, currencyUnit, currencyCode, isLoading, error}) => {

    const {t} = useTranslation();
    const [chartData, setChartData] = useState();
    const socket = useSocket();
    console.log(coins)
    // useEffect(() => {
    //     setChartData(prev => [...prev, socket?.result.last]);
    // }, [])
    // console.log(chartData);
    console.log(socket);
    return (
        <div className='min-w-[1010px]'>
            <ul className='grid grid-cols-4 mb-6'>
                <li>{t("currency name")}</li>
                <li>{t("price") + ` (${currencyUnit})`}</li>
                <li>{t("changes")}</li>
                <li>{t("Chart of changes")}</li>
            </ul>
            {isLoading ? <Loading/> :
                error ? <Error error={error}/> :
                    coins.map((coin, i) => {
                        return (
                            <Table key={i} coin={coin} currencyCode={currencyCode} currencyUnit={currencyUnit} />
                        )
                    })}
        </div>
    )
}
export default CoinTable;