import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {useCryptoApi} from "../api/useCryptoApi.js";
import Loading from "../component/Loading.jsx";
import Error from "../component/Error.jsx";
import ApexChart from "../component/ApexChart.jsx";

const AboutCurrency = () => {
    const {data: coins, isLoading, error} = useCryptoApi(false)
    const location = useLocation().pathname.split("/")[2]
    const data = coins?.filter((coin) => coin.id === location)[0]
    const {t} = useTranslation();

    if (isLoading) return <Loading />

    if (error) return <Error error={error} />

    return (
        <div className="flex justify-center items-center">
            <div
                className="w-3/4 shadow-2xl shadow-black/20 rounded-lg dark:shadow-white/20 overflow-hidden text-center max-sm:w-11/12">
                <div dir='ltr' className="flex items-center p-4 bg-gradient-to-r from-[#03B8FF]/50 to-purple-600/50">
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
                            <span className="font-semibold">{t("Current Price")}:</span> {(data.current_price)}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("market capitalization")}:</span> {(data.market_cap).toLocaleString()}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("highest price 24")}:</span> {(data.high_24h)}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("lowest price 24")}:</span> {(data.low_24h)}
                        </p>
                        <p>
                            <span className="font-semibold">{t("all time high")} (ATH):</span> {(data.ath)}
                        </p>
                        <p>
                            <span className="font-semibold">{t("all time low")} (ATL):</span> {(data.atl)}
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
                            <span className='uppercase'></span>
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("percentage change last 24")}:</span> {data.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-gray-100 text-gray-700">
                    <h2 className="text-lg font-semibold mb-2">{t("Additional Information")}</h2>
                    <div className='flex items-center justify-between gap-4 flex-col w-full'>
                        <div className='max-lg:w-full overflow-x-auto flex justify-center items-start overflow-y-hidden'>
                                   <ApexChart coin={data} />
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
