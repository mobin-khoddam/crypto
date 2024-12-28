import { isProfitHandler } from "../../helper/isProfitHandler.js";
import { Link } from "react-router-dom";
import Chart from "../Chart.jsx";
import useSocket from "../../api/useSocket.js";
import ApexChart from "../ApexChart.jsx";

const Table = ({ coin, currencyCode, currencyUnit }) => {
    const profitOrLoss = isProfitHandler(coin.current_price, coin.price_change_24h, coin.id);
    const data = useSocket(coin?.symbol.toUpperCase())
    console.log(data)

    const color = (data) => {
        if (data < 0 ) {
            return 'text-red-500'
        } else {
            return 'text-green-500'
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {/*const numberFormat = new Intl.NumberFormat(currencyCode, {*/}
            {/*    style: "currency",*/}
            {/*    currency: currencyUnit,*/}
            {/*    minimumFractionDigits: 2,*/}
            {/*    maximumFractionDigits: 2*/}
            {/*}).format(coin.current_price);*/}
            <Link to={`/Currency/${coin.id}`}
                className="grid grid-cols-4 my-2 text-start"
                key={coin.id}>
                <div className='flex items-center gap-4'>
                    <img className="w-10" src={coin.image} alt={coin.name} />
                    <div>
                        <h3 className="font-semibold">{coin.id}</h3>
                        <h3 className="text-gray-500">{coin.symbol}</h3>
                    </div>
                </div>
                <h4 className={`font-bold text-lg`}>{data.result?.last}</h4>
                <h4 className={`${color(data.result?.change_percentage)}`}>
                    % {data?.result?.change_percentage}
                </h4>
                <Chart name={coin.id}
                    data={coin.sparkline_in_7d.price}
                    height={50} width={150} />
                {/* <ApexChart coin={coin}  /> */}

            </Link>
        </div>
    )
}
export default Table;