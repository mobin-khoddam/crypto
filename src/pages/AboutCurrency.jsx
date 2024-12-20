import Chart from "../component/Chart.jsx";
import {isProfitHandler} from "../helper/isProfitHandler.js";

const AboutCurrency = ({data, currencyUnit, currencyCode}) => {
    const isProfit = isProfitHandler(data.current_price, data.price_change_24h, data.id)
    const currencyMaker = (currency) => {
        return new Intl.NumberFormat(currencyCode, {
            style: "currency",
            currency: currencyUnit,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(currency);
    }
    return (
        <div className="flex justify-center items-center">
            <div
                className="w-3/4 shadow-2xl shadow-black/20 rounded-lg dark:shadow-white/20 overflow-hidden text-center max-sm:w-11/12">
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-800 to-purple-600">
                    <img src={data.image} alt={data.name} className="w-16 h-16 rounded-full mr-4"/>
                    <div>
                        <h1 className="text-xl font-bold">
                            {data.name} ({data.symbol.toUpperCase()})
                        </h1>
                        <p className="text-sm">Market Rank: #{data.market_cap_rank}</p>
                    </div>
                </div>

                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Market Data</h2>
                    <div className="grid grid-cols-2 gap-4 max-[1070px]:grid-cols-1">
                        <p>
                            <span className="font-semibold">Current Price:</span> {currencyMaker(data.current_price)}
                        </p>
                        <p>
                            <span
                                className="font-semibold">Market Capitalization:</span> {currencyMaker(data.market_cap).toLocaleString()}
                        </p>
                        <p>
                            <span
                                className="font-semibold">The highest price in the last 24 hours:</span> {currencyMaker(data.high_24h)}
                        </p>
                        <p>
                            <span
                                className="font-semibold">The lowest price in the last 24 hours:</span> {currencyMaker(data.low_24h)}
                        </p>
                        <p>
                            <span className="font-semibold">All-Time High (ATH):</span> {currencyMaker(data.ath)}
                        </p>
                        <p>
                            <span className="font-semibold">All-Time Low (ATL):</span> {currencyMaker(data.atl)}
                        </p>
                        <p>
                            <span className="font-semibold">Maximum Supply:</span>{" "}
                            {data.max_supply?.toLocaleString() || "Not Available"}
                        </p>
                        <p>
                            <span
                                className="font-semibold">Circulating Supply:</span> {data.circulating_supply.toLocaleString()}
                        </p>
                        <p>
                            <span
                                className="font-semibold">Price Change in the Last 24 Hours:</span> {data.price_change_24h.toFixed(2)}
                            <span className='uppercase'>{currencyUnit}</span>
                        </p>
                        <p>
                            <span
                                className="font-semibold">Percentage Change in the Last 24 Hours:</span> {data.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-gray-100 text-gray-700">
                    <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
                    <div className='flex items-center justify-between gap-4 max-lg:flex-col'>
                        <div className='max-lg:w-full overflow-x-auto pr-4 flex justify-center items-start'>
                            <Chart bigChart={true} data={data.sparkline_in_7d.price.slice(-100)}
                                   profitColor={isProfit.style} width={350}
                                   height={130}/>
                        </div>
                        <div>
                            <p>
                            <span
                                className="font-semibold">ATH Date (All-Time High):</span> {new Date(data.ath_date).toLocaleDateString()}
                            </p>
                            <p>
                            <span
                                className="font-semibold">ATL Date (All-Time Low):</span> {new Date(data.atl_date).toLocaleDateString()}
                            </p>
                            <p>
                            <span
                                className="font-semibold">Last Updated:</span> {new Date(data.last_updated).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutCurrency;
