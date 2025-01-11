import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import useSocket from "../api/useSocket.js";
import {useCryptoApi} from "../api/useCryptoApi.js";
import Loading from "../component/Loading.jsx";
import Error from "../component/Error.jsx";
import {lazy, Suspense} from "react";
const Apex = lazy(() => import("../component/ApexChart.jsx"));

const AboutCurrency = () => {
    const params = useParams().coin;
    const  {data: coin, isLoading, error} = useCryptoApi(false)
    const {t} = useTranslation();

    const data = coin ? coin.filter((item) => item.symbol === params)[0] : []
    const socket = useSocket(params?.toUpperCase());
    if (isLoading) return <Loading />

    if (error) return <Error error={error} />

    const numberFormat = (currency) => {
        if (isNaN(currency)) return ''
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(currency)
    }

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
                            <span
                                className="font-semibold">{t("Current Price")}:</span> {(numberFormat(socket.result?.last) || numberFormat(data.current_price))}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("market capitalization")}:</span> {(data.market_cap).toLocaleString()}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("highest price 24")}:</span> {(numberFormat(data?.high_24h))}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("lowest price 24")}:</span> {(numberFormat(data?.low_24h))}
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("all time high")} (ATH):</span> {(numberFormat(data.ath))}
                        </p>
                        <p>
                            <span className="font-semibold">{t("all time low")} (ATL):</span> {(numberFormat(data.atl))}
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
                                className="font-semibold">{t("price change last 24")}:</span> {numberFormat(data.price_change_24h)}
                            <span className='uppercase'></span>
                        </p>
                        <p>
                            <span
                                className="font-semibold">{t("percentage change last 24")}:</span> {(data.price_change_percentage_24h).toFixed(2)}%
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-gray-100 text-gray-700">
                    <div className='flex items-center justify-between gap-4 flex-col w-full'>
                        <h2 className='font-semibold'>
                            candlestick
                        </h2>
                        <Suspense className='w-full overflow-x-auto flex justify-center items-start overflow-y-hidden'>
                            <Apex coin={data}/>
                        </Suspense>
                    <h2 className="text-lg font-semibold ">{t("Additional Information")}</h2>
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
                                className="font-semibold">{t("Last Updated")} :</span> {new Date(data.last_updated).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutCurrency;
