
import {useState} from "react";
import Fuse from "fuse.js";
import {useTranslation} from "react-i18next";
import {useCryptoApi} from "../../api/useCryptoApi.js";
import SearchInputCoins from "./searchInputCoins.jsx";


const SearchInput = () => {
    const [searchValue, setSearchValue] = useState("");
    const [filteredCoins, setFilteredCoins] = useState([]);
    const {data: coins} = useCryptoApi(false)

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
        <div className='w-[280px] max-w-full relative flex items-center my-10'>
            <input onKeyDown={(e) => openCloseHandler(e.key)} onChange={(e) => searchValueHandler(e.target.value)}
                   value={searchValue}
                   className='w-full p-2 rounded-md outline-[#03B8FF] text-dark-color placeholder:text-gray-600 border border-dark-color' type="text"
                   placeholder={t("search crypto")}/>
            {
                filteredCoins.length !== 0 &&
                <div
                    className='bg-white absolute top-14 rounded-md w-full p-4 pt-0 flex flex-col gap-2 max-h-[300px] overflow-auto'>
                    <span onClick={() => searchValueHandler("")}
                          className='text-red-500 cursor-pointer font-bold ml-auto sticky top-0 bg-white w-full text-end p-2 text-xl'>X</span>
                    {
                        filteredCoins.map(coin => (
                            <SearchInputCoins coin={coin} key={coin.id} />
                        ))
                    }
                </div>
            }
        </div>
    )
}
export default SearchInput;