import Chart from "./Chart.jsx";
import Loading from "./Loading.jsx";
import Error from "./Error.jsx";
import {isProfitHandler} from "../helper/isProfitHandler.js";

const CoinTable = ({coins, currencyUnit, currencyCode, isLoading, error, setDataHandler}) => {

    return (
        <div className='min-w-[1010px]'>
            <ul className='grid grid-cols-4 mb-6'>
                <li>currency name</li>
                <li>{`price (${currencyUnit})`}</li>
                <li>Changes</li>
                <li>Chart of changes</li>
            </ul>
            {isLoading ? <Loading/> :
                error ? <Error error={error}/> :
                    <div className="flex flex-col gap-4">
                        {coins.map(coin => {
                            const numberFormat = new Intl.NumberFormat(currencyCode, {
                                style: "currency",
                                currency: currencyUnit,
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }).format(coin.current_price);
                            const profitOrLoss = isProfitHandler(coin.current_price, coin.price_change_24h, coin.id);
                            return (
                                <button onClick={() => setDataHandler(coin)} className="grid grid-cols-4 my-2 text-start"
                                        key={coin.id}>
                                    <div className='flex items-center gap-4'>
                                        <img className="w-10" src={coin.image} alt={coin.name}/>
                                        <div>
                                            <h3 className="font-semibold">{coin.id}</h3>
                                            <h3 className="text-gray-500">{coin.symbol}</h3>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-lg">{numberFormat}</h4>
                                    <h4 className={`${profitOrLoss.textStyle}`}>
                                        {profitOrLoss.title}
                                    </h4>
                                    <Chart name={coin.id} profitColor={profitOrLoss.style}
                                           data={coin.sparkline_in_7d?.price.slice(-60)}
                                           height={50} width={150}/>
                                </button>
                            );
                        })}
                    </div>}
        </div>
    )
}
export default CoinTable;