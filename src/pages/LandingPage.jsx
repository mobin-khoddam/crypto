import CoinTable from "../component/CoinTable.jsx";
import {useState} from "react";
import SearchInput from "../component/SearchInput.jsx";
import {useTranslation} from "react-i18next";
import {useCryptoApi} from "../api/useCryptoApi.js";



const LandingPage = ({setDataHandler, currencyUnitHandler, currencyUnit, currencyCode}) => {
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("page") || 1);

    const {data: coins, error, isLoading} = useCryptoApi(currencyUnit, currentPage);


    const currencyUnitData = [
        {id: 3, unit: 'usd', code: 'en-US', text: 'US currency'},
        {id: 1, unit: 'gbp', code: 'en-GB', text: 'British currency'},
        {id: 2, unit: 'eur', code: 'de-DE', text: 'European currency'},
    ];

    const nextPageHandler = (newPage) => {
        if (newPage === "plus" ) {
            const nextPage = +currentPage + 1
            setCurrentPage(nextPage)
            localStorage.setItem("page", nextPage.toString())
        } else if (newPage === "minus" && +currentPage !== 1) {
            const prevPage = +currentPage - 1;
            setCurrentPage(prevPage)
            localStorage.setItem("page", prevPage.toString())
        }
    }

    const {t} = useTranslation();
    return (
        <>
            <div>
                <div className="mb-6 flex items-center justify-between max-[900px]:flex-col gap-10 max-[900px]:items-start">
                    <div>
                        <h1 className="dark:text-white font-semibold text-2xl">{t("title")}</h1>
                        <h2 className="text-gray-500">{t("subTitle")}</h2>
                    </div>
                    <div
                        className='[&>button]:border-gray-500 dark:[&>button]:border-light-color [&>button]:border [&>button]:rounded-lg [&>button]:p-2 active:[&>button]:scale-95 [&>button]:duration-150 flex items-center gap-4'>
                        {currencyUnitData.map(unitData => (
                            <button
                                key={unitData.id}
                                className={currencyUnit === unitData.unit && "text-green-500"}
                                onClick={() => currencyUnitHandler(unitData.unit, unitData.code)}
                            >
                                {t(unitData.text)}
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
                        className='text-xl flex items-center gap-4 [&>button]:border [&>button]:rounded-md [&>button]:py-1 [&>button]:px-2 my-6 justify-center '>
                        <button className='text-red-400 border-gray-500 dark:border-light-color'
                                onClick={() => nextPageHandler("minus")}>{t("previous")}
                        </button>
                        {<button className='border-black dark:border-gray-500'
                                                   onClick={() => nextPageHandler("minus")}>{+currentPage === 1 ? '-' :  +currentPage - 1}</button>}
                        <button className='border-gray-500 dark:border-light-color'>{+currentPage}</button>
                        <button className='border-black dark:border-gray-500'
                                onClick={() => nextPageHandler("plus")}>{+currentPage + 1}</button>
                        <button className='text-green-400 border-gray-500 dark:border-light-color'
                                onClick={() => nextPageHandler('plus')}>{t("next")}
                        </button>
                    </div>}
            </div>
        </>
    );
};

export default LandingPage;
