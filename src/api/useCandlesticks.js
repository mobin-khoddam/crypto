import axios from "axios";
import {useQuery} from "react-query";

const candlesticksApi = async (coin) => {
    const res = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${coin}USDT&interval=1m&limit=100`)
    return res.data
}

export const useCandlesticks = (coin) => {
    return useQuery(['candlesticks', coin] , () => candlesticksApi(coin),{
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60,
    } );
}