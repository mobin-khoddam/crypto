import {useQuery} from "react-query";
import axios from "axios";
import CoinTable from "../component/CoinTable.jsx";
import {useState} from "react";
import SearchInput from "../component/SearchInput.jsx";

const coinApi = async (unit, page) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
            vs_currency: unit,
            per_page: 10,
            page: page,
            order: "market_cap_desc",
            sparkline: true,
        },
    });
    return res.data;
}

const LandingPage = ({setDataHandler, currencyUnitHandler, currencyUnit, currencyCode}) => {
    const [morePage, setMorePage] = useState(localStorage.getItem("page") || 1);

    const {data: coins, error, isLoading} = useQuery(
        ["coinApi-marketData", currencyUnit, morePage], () => coinApi(currencyUnit, morePage),
        {
            cacheTime: 1000 * 60 * 10,
            staleTime: 1000 * 60 * 5,
        }
    );



    const currencyUnitData = [
        {id: 3, unit: 'usd', code: 'en-US', text: 'US currency'},
        {id: 1, unit: 'gbp', code: 'en-GB', text: 'British currency'},
        {id: 2, unit: 'eur', code: 'de-DE', text: 'European currency'},
    ];

    const nextPageHandler = (newPage) => {
        if (newPage === "plus" ) {
            const nextPage = +morePage + 1
            setMorePage(nextPage)
            localStorage.setItem("page", nextPage.toString())
        } else if (newPage === "minus" && +morePage !== 1) {
            const prevPage = +morePage - 1;
            setMorePage(prevPage)
            localStorage.setItem("page", prevPage.toString())
        }
    }

    return (
        <>
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="dark:text-white font-semibold text-2xl">List of digital currencies</h1>
                        <h2 className="text-gray-500">Price table of digital currency market leaders
                            (tokens)</h2>
                    </div>
                    <div
                        className='[&>button]:border-gray-500 dark:[&>button]:border-light-color [&>button]:border [&>button]:rounded-lg [&>button]:p-2 active:[&>button]:scale-95 [&>button]:duration-150 flex items-center gap-4'>
                        {currencyUnitData.map(unitData => (
                            <button
                                key={unitData.id}
                                className={currencyUnit === unitData.unit && "text-green-500"}
                                onClick={() => currencyUnitHandler(unitData.unit, unitData.code)}
                            >
                                {unitData.text}
                            </button>
                        ))}
                    </div>
                </div>
                <SearchInput setDataHandler={setDataHandler} currencyUnit={currencyUnit}  />
                <div className='overflow-x-auto'>
                    <CoinTable isLoading={isLoading} error={error} currencyUnit={currencyUnit}
                               currencyCode={currencyCode} coins={coins} setDataHandler={setDataHandler}/>
                </div>
                {isLoading ? null : error ? null :
                    <div
                        className='text-xl flex items-center gap-4 [&>button]:border [&>button]:rounded-md [&>button]:py-1 [&>button]:px-2 my-5 justify-center '>
                        <button className='text-red-400 border-gray-500 dark:border-light-color'
                                onClick={() => nextPageHandler("minus")}>prev
                        </button>
                        {<button className='border-black dark:border-gray-500'
                                                   onClick={() => nextPageHandler("minus")}>{+morePage === 1 ? '-' :  +morePage - 1}</button>}
                        <button className='border-gray-500 dark:border-light-color'>{+morePage}</button>
                        <button className='border-black dark:border-gray-500'
                                onClick={() => nextPageHandler("plus")}>{+morePage + 1}</button>
                        <button className='text-green-400 border-gray-500 dark:border-light-color'
                                onClick={() => nextPageHandler('plus')}>next
                        </button>
                    </div>}
            </div>
        </>
    );
};

export default LandingPage;
