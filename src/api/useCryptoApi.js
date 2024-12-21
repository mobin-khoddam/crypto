import axios from "axios";
import {useQuery} from "react-query";

const coinApi = async (unit, page) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
            vs_currency: unit,
            per_page: page && 10,
            page: page,
            order: "market_cap_desc",
            sparkline: true,
        },
    });
    return res.data;
}

export const useCryptoApi = (unit, page) => {
    return useQuery(['coinApi', unit, page], () => coinApi(unit, page),
        {
            cacheTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 2,
        })
}