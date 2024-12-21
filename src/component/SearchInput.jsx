import searchIcon from "../assets/icons-search.png";
import axios from "axios";
import {useQuery} from "react-query";
import {useState} from "react";
import Fuse from "fuse.js";
import {useTranslation} from "react-i18next";

const searchData = async (unit) => {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
            vs_currency: unit,
            order: "market_cap_desc",
            sparkline: true,
        }
    })
    return res.data;
}

const SearchInput = ({currencyUnit, setDataHandler}) => {
    const [searchValue, setSearchValue] = useState("");
    const [filteredCoins, setFilteredCoins] = useState([]);

    const {data: coins} = useQuery(["search", currencyUnit], () => searchData(currencyUnit), {
        cacheTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
    })


    const searchCoin = () => {
        const fuse = new Fuse(coins, {
            keys: ['id'],
            threshold: 0.3,
        });

        setFilteredCoins(fuse.search(searchValue))
    }

    const searchValueHandler = (value) => {
        setSearchValue(value)
        searchCoin()
        if (!value) {
            setFilteredCoins([]);
        }
    }

    const openCloseHandler = (value) => {
        if (value === "Escape") {
            searchValueHandler("")
        }
    }

    const {t} = useTranslation();

    return (
        <div className='w-[280px] relative flex items-center my-10'>
            <input onKeyDown={(e) => openCloseHandler(e.key)} onChange={(e) => searchValueHandler(e.target.value)}
                   value={searchValue}
                   className='w-full text-sm p-2 rounded-md outline-[#F06292] text-dark-color' type="text"
                   placeholder={t("search crypto")}/>
            {/*<img onClick={searchCoin} className='absolute right-1 w-7 h-7 cursor-pointer' src={searchIcon} alt=""/>*/}
            {
                filteredCoins.length !== 0 &&
                <div
                    className='bg-white absolute top-10 rounded-md w-full p-4 pt-0 flex flex-col gap-2 max-h-[300px] overflow-auto'>
                    <span onClick={() => searchValueHandler("")}
                          className='text-red-500 cursor-pointer font-bold ml-auto sticky top-0 bg-white w-full text-end p-2 text-xl'>X</span>
                    {
                        filteredCoins.map(coin => (
                            <button onClick={() => setDataHandler(coin.item)} className='flex justify-between ' key={coin.item.id}>
                                <img className='w-7' src={coin.item.image} alt=""/>
                                <span className='text-black'>{coin.item.id}</span>
                            </button>
                        ))
                    }
                </div>
            }
        </div>
    )
}
export default SearchInput;