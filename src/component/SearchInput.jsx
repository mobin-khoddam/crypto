
import {useState} from "react";
import Fuse from "fuse.js";
import {useTranslation} from "react-i18next";
import {useCryptoApi} from "../api/useCryptoApi.js";
import {Link} from "react-router-dom";


const SearchInput = ({currencyUnit}) => {
    const [searchValue, setSearchValue] = useState("");
    const [filteredCoins, setFilteredCoins] = useState([]);


    const {data: coins} = useCryptoApi(currencyUnit, false)

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
            {
                filteredCoins.length !== 0 &&
                <div
                    className='bg-white absolute top-10 rounded-md w-full p-4 pt-0 flex flex-col gap-2 max-h-[300px] overflow-auto'>
                    <span onClick={() => searchValueHandler("")}
                          className='text-red-500 cursor-pointer font-bold ml-auto sticky top-0 bg-white w-full text-end p-2 text-xl'>X</span>
                    {
                        filteredCoins.map(coin => (
                            <Link to={`/currency/${coin.item.id}`} className='flex justify-between ' key={coin.item.id}>
                                <img className='w-7' src={coin.item.image} alt=""/>
                                <span className='text-black'>{coin.item.id}</span>
                            </Link>
                        ))
                    }
                </div>
            }
        </div>
    )
}
export default SearchInput;