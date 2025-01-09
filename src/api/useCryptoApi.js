import axios from "axios";
import {useQuery} from "react-query";

const coinApi = async (page) => {
    const params = page ? {
        vs_currency: 'usd',
        per_page: 10,
        page: page,
        order: "market_cap_desc",
        sparkline: true,
    } : {
        vs_currency: 'usd',
        order: "market_cap_desc",
        sparkline: true,
    }

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params
    });
    return res.data;
}

export const useCryptoApi = (page) => {
    return useQuery({
        queryKey: ['coinApi', page],
        queryFn: () => coinApi(page),
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
        // select: (data) => {
        //      return data.filter ((item) => item.id !== 'tether')
        // }
    })
}
