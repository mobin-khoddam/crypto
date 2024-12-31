import CoinTable from "../component/coinTable/CoinTable.jsx";
import {useState} from "react";
import SearchInput from "../component/SearchInput/SearchInput.jsx";
import {useTranslation} from "react-i18next";
import {useCryptoApi} from "../api/useCryptoApi.js";
import {useLocation, useNavigate} from "react-router-dom";


const CryptoPage = () => {

    const [currentPage, setCurrentPage] = useState(useLocation().pathname.split('/')[2] || 1);

    const {data: coins, error, isLoading} = useCryptoApi(currentPage);
    const navigate = useNavigate();

    const nextPageHandler = (newPage) => {
        if (newPage === "plus") {
            const nextPage = +currentPage + 1
            setCurrentPage(nextPage)
            navigate(`/page/${nextPage}`)
        } else if (newPage === "minus" && +currentPage !== 1) {
            const prevPage = +currentPage - 1;
            setCurrentPage(prevPage)
            navigate(`/page/${prevPage}`)
        }
    }

    const {t} = useTranslation();
    return (
        <>
            <div>
                <div
                    className="mb-6 flex items-center justify-between max-[900px]:flex-col gap-10 max-[900px]:items-start">
                    <div>
                        <h1 className="dark:text-white font-semibold text-2xl">{t("title")}</h1>
                        <h2 className="text-gray-500">{t("subTitle")}</h2>
                    </div>
                    <div
                        className='[&>button]:border-gray-500 dark:[&>button]:border-light-color [&>button]:border [&>button]:rounded-lg [&>button]:p-2 active:[&>button]:scale-95 [&>button]:duration-150 flex items-center gap-4'>
                    </div>
                </div>
                <SearchInput/>
                <div className='overflow-x-auto'>
                    <CoinTable isLoading={isLoading} error={error}
                               coins={coins}/>
                </div>
                {isLoading ? null : error ? null :
                    <div
                        className='text-xl flex items-center gap-4 [&>button]:border [&>button]:rounded-md [&>button]:py-1 [&>button]:px-2 my-6 justify-center '>
                        <button className='bg-[#03B8FF]/20 border-gray-600 dark:border-light-color font-bold'
                                onClick={() => nextPageHandler("minus")}>{'<'}
                        </button>
                        {<button className='border-black dark:border-gray-600'
                                 onClick={() => nextPageHandler("minus")}>{+currentPage === 1 ? '-' : +currentPage - 1}</button>}
                        <button
                            className='border-gray-600 dark:border-light-color bg-[#03B8FF]/10'>{+currentPage}</button>
                        <button className='border-black dark:border-gray-600'
                                onClick={() => nextPageHandler("plus")}>{+currentPage + 1}</button>
                        <button className='bg-[#03B8FF]/20 border-gray-600 font-bold dark:border-light-color'
                                onClick={() => nextPageHandler('plus')}>{'>'}
                        </button>
                    </div>}
            </div>
        </>
    );
};

export default CryptoPage;
