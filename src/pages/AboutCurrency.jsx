import Chart from "../component/Chart.jsx";
import {isProfitHandler} from "../helper/isProfitHandler.js";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();
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
                        <p className="text-sm">{t("Market Rank")}: #{data.market_cap_rank}</p>
                    </div>
                </div>

                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{t("market data")}</h2>
                    <div className="grid grid-cols-2 gap-4 max-[1070px]:grid-cols-1">
                        <p>
                            <span className="font-semibold">{t("Current Price")}:</span> {currencyMaker(data.current_price)}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("market capitalization")}:</span> {currencyMaker(data.market_cap).toLocaleString()}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("highest price 24")}:</span> {currencyMaker(data.high_24h)}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("lowest price 24")}:</span> {currencyMaker(data.low_24h)}
                        </p>
                        <p>
                            <span className="font-semibold">{t("all time high")} (ATH):</span> {currencyMaker(data.ath)}
                        </p>
                        <p>
                            <span className="font-semibold">{t("all time low")} (ATL):</span> {currencyMaker(data.atl)}
                        </p>
                        <p>
                            <span className="font-semibold">{t("maximums supply")}:</span>{" "}
                            {data.max_supply?.toLocaleString() || "Not Available"}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("circulating supply")}:</span> {data.circulating_supply.toLocaleString()}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("price change last 24")}:</span> {data.price_change_24h.toFixed(2)}
                            <span className='uppercase'>{currencyUnit}</span>
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("percentage change last 24")}:</span> {data.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-gray-100 text-gray-700">
                    <h2 className="text-lg font-semibold mb-2">{t("Additional Information")}</h2>
                    <div className='flex items-center justify-between gap-4 max-lg:flex-col'>
                        <div className='max-lg:w-full overflow-x-auto pr-4 flex justify-center items-start'>
                            <Chart bigChart={true} data={data.sparkline_in_7d.price.slice(-100)}
                                   profitColor={isProfit.style} width={350}
                                   height={130}/>
                        </div>
                        <div>
                            <p>
                            <span
                                className="font-semibold">{t("ATH Date")} (ATH):</span> {new Date(data.ath_date).toLocaleDateString()}
                            </p>
                            <p>
                            <span
                                className="font-semibold">{t("ATL Date")} (ATL):</span> {new Date(data.atl_date).toLocaleDateString()}
                            </p>
                            <p>
                            <span
                                className="font-semibold">{t("Last Updated")} :</span> {new Date(data.last_updated).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutCurrency;
