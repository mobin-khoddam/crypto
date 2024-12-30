import axios from "axios";
import {useQuery} from "react-query";

const coinApi = async (page) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
            vs_currency: 'usd',
            per_page: page && 10,
            page: page,
            order: "market_cap_desc",
            sparkline: true,
        },
    });
    return res.data;
}

export const useCryptoApi = (page) => {
    return useQuery({
        queryKey: ['coinApi', page],
        queryFn: () => coinApi(page),
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60,
    })
}
